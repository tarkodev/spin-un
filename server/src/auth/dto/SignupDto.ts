import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignupDto {
  @IsOptional()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly login: string;
  @IsNotEmpty()
  readonly password: string;
}
