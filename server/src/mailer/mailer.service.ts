import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '../../node_modules/@nestjs/config';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) { }
  private transporter() {
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get('EMAIL'),
        pass: this.configService.get('PASSWORD'),
      },
    });
    return transport;
  }

  sendSignUpConfirmation(userEmail: string) {
    this.transporter().sendMail({
      from: 'spinungame@gmail.com',
      to: userEmail,
      subject: 'Inscription',
      html: '<h3>Confirmation inscription</h3>',
    });
  }

  sendResetPassword(email: string, url: string, code: string) {
    this.transporter().sendMail({
      from: 'spinungame@gmail.com',
      to: email,
      subject: 'Re-initialisation du mot de passe',
      html: `
        <a href="${url}">Re-initialisation du mot de passe</a>
        <p>Code secret <strong>${code}</strong></p>
        <p>Le code expire dans 15 minutes</p>
      `,
    });
  }
}
