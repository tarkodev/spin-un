import {
  Body,
  Controller,
  Post,
  UseGuards,
  Delete,
  Redirect,
  Get,
} from '../../node_modules/@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { SignupDto } from './dto/SignupDto';
import { ResetPasswordDto } from './dto/ResetPasswordDto';
import { ResetPasswordConfirmationDto } from './dto/ResetPasswordConfirmationDto';
import { DeleteAccountDto } from './dto/DeleteAccountDto';
import { AuthGuard } from '../../node_modules/@nestjs/passport';
import { ResponseSignup } from './response/ResponseSignup';
import { ResponseLogin } from './response/ResponseLogin';
import { ResponseResetPassword } from './response/ResponseResetPassword';
import { ResponseResetPasswordConfirmation } from './response/ResponseResetPasswordConfirmation';
import { ResponseDeleteAccount } from './response/ResponseDeleteAccount';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Permet de créer un utilisateur dans la base donnée
   * @param signupDto - le client doit envoyer un json contenant les attributs suivant : email (optionnel), login et password
   * @returns Promise<ResponseSignup> - l'API renvoit un json contenant les attributs suivant : status (code http) et error (s'il y en a une)
   */
  @Post('signup')
  signup(@Body() signupDto: SignupDto): Promise<ResponseSignup> {
    return this.authService.signup(signupDto);
  }

  /**
   * Permet à un utilisateur de se connecter
   * @param loginDto - le client doit envoyer un json contenant les attributs suivant : login et password
   * @returns Promise<ResponseLogin> - l'API renvoit un json contenant les attributs : status (code http), token et error (s'il y en a une)
   */
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<ResponseLogin> {
    return this.authService.login(loginDto);
  }

  /**
   * Permet d'envoyer un mail pour contenant le code et l'url pour la réinitialisation du projet
   * @param resetPasswordDto - le client doit envoyer un json contenant l'attribut email
   * @returns Promise<ResponseResetPassword> - l'API renvoie un json contenant les attributs : status (code http) et error (s'il y en a une)
   */
  @Post('reset-password')
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<ResponseResetPassword> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  /**
   * Permet de réinitialiser le mot de passe
   * @param resetPasswordConfirmationDto - le client doit envoyer une json contenant les attributs : email, newPassword et code (voir resetPassword)
   * @returns ResponseResetPasswordConfirmation - l'API renvoie un json contenant les attributs : status (code http) et error (s'il y en a une)
   */
  @Post('reset-password-confirmation')
  resetPasswordConfirmation(
    @Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ): Promise<ResponseResetPasswordConfirmation> {
    return this.authService.resetPasswordConfirmation(
      resetPasswordConfirmationDto,
    );
  }

  /**
   * Permet de supprimer un compte
   * @param deleteAccountDto - le client doit envoyer un json contenant les attribut login et password
   * @returns ResponseDeleteAccount - l'API renvoit un json contenant les attributs : status (code http) et error (s'il y en a une)
   * @
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete-account')
  deleteAccount(
    @Body() deleteAccountDto: DeleteAccountDto,
  ): Promise<ResponseDeleteAccount> {
    return this.authService.deleteAccount(deleteAccountDto);
  }
}
