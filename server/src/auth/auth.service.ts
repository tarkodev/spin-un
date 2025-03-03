import { Injectable } from '../../node_modules/@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import { SignupDto } from './dto/SignupDto';
import { ResetPasswordDto } from './dto/ResetPasswordDto';
import { ResetPasswordConfirmationDto } from './dto/ResetPasswordConfirmationDto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { ConfigService } from '../../node_modules/@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { DeleteAccountDto } from './dto/DeleteAccountDto';
import { ResponseSignup } from './response/ResponseSignup';
import { ResponseLogin } from './response/ResponseLogin';
import { ResponseResetPassword } from './response/ResponseResetPassword';
import { ResponseResetPasswordConfirmation } from './response/ResponseResetPasswordConfirmation';
import { ResponseDeleteAccount } from './response/ResponseDeleteAccount';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaSerice: PrismaService,
    private readonly mailerServie: MailerService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<ResponseSignup> {
    const { email, login, password } = signupDto;
    let res: ResponseSignup;

    // Vérifier si l'utilisateur est déjà inscrit
    try {
      const user = await this.prismaSerice.user.findUnique({
        where: { login: login },
      });

      if (user) {
        return (res = {
          status: 409,
          error: 'utilsateur déjà présent dans la base données',
        });
      }

      // Hasher le mot de passe dans la base de données
      const hash = await bcrypt.hash(password, 10);

      // Enregistrer l'utilisateur dans la basez données
      await this.prismaSerice.user.create({
        data: { email: email, login: login, password: hash },
      });
      // Envoyer un mail de confirmation d'inscription si l'utilisateur à renseigner un mail
      if (email) {
        this.mailerServie.sendSignUpConfirmation(email);
      }

      // Retourner une réponse de succès
      return (res = {
        status: 201,
        error: null,
      });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async login(loginDto: LoginDto): Promise<ResponseLogin> {
    const { login, password } = loginDto;
    let res: ResponseLogin;

    // Vérifier si l'utilisateur est déjà inscrit
    try {
      const user = await this.prismaSerice.user.findUnique({
        where: { login: login },
      });

      if (!user) {
        return (res = {
          status: 404,
          token: null,
          error: 'utilsateur n existe pas présent dans la base données',
        });
      }

      // Comparer le mot de passe fournie à celui de la base de données
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return (res = {
          status: 401,
          token: null,
          error: 'Mauvais mot de passe',
        });
      }

      // Retourner un token jwt
      const payload = {
        sub: user.id,
        login: user.login,
      };

      const token = this.jwtService.sign(payload, {
        secret: this.configService.get('SECRET_KEY'),
      });

      return (res = {
        status: 200,
        token: token,
        error: null,
      });
    } catch (e) {
      return (res = {
        status: 400,
        token: null,
        error: e,
      });
    }
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<ResponseResetPassword> {
    // Verifier que l'email existe dans la base de données
    const { email } = resetPasswordDto;
    let res: ResponseResetPassword;
    try {
      const user = await this.prismaSerice.user.findUnique({
        where: { email: email },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède cet email',
        });
      }
      const code = speakeasy.totp({
        secret: this.configService.get('OTP_CODE'),
        digits: 5,
        step: 60 * 15,
        encoding: 'base32',
      });
      // Faudra spécifier une véritable url
      const url = 'http://188.165.205.60:10000/forgetconfirmepwd';
      this.mailerServie.sendResetPassword(email, url, code);

      return (res = {
        status: 200,
        error: null,
      });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async resetPasswordConfirmation(
    resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ): Promise<ResponseResetPasswordConfirmation> {
    const { email, newPassword, code } = resetPasswordConfirmationDto;
    let res: ResponseResetPasswordConfirmation;
    // On vérifie si l'utilisateur existe dans la base de donées
    try {
      const user = await this.prismaSerice.user.findUnique({
        where: { email: email },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède cet email',
        });
      }
      const match = speakeasy.totp.verify({
        secret: this.configService.get('OTP_CODE'),
        token: code,
        digits: 5,
        step: 60 * 15,
        encoding: 'base32',
      });
      if (!match) {
        return {
          status: 401,
          error: 'Code incorrecte',
        };
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await this.prismaSerice.user.update({
        where: { email: email },
        data: {
          password: hash,
        },
      });
      return { status: 200, error: null };
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async deleteAccount(
    deleteAccountDto: DeleteAccountDto,
  ): Promise<ResponseDeleteAccount> {
    const { login, password } = deleteAccountDto;
    let res: ResponseDeleteAccount;
    // On vérifie si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaSerice.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède ce login',
        });
      }
      // Comparer le mot de passe
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return (res = {
          status: 401,
          error: 'mot de passe incorrecte',
        });
      }
      // Supprimer l'utilisateur
      await this.prismaSerice.user.delete({ where: { login: login } });
      return (res = { status: 200, error: null });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async validateToken(token: string) {
    const payload = this.jwtService.verifyAsync(token);
    return payload;
  }
}
