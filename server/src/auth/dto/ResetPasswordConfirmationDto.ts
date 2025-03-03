import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordConfirmationDto {
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly newPassword: string;
  @IsNotEmpty()
  readonly code: string;
}
