import { IsNotEmpty } from 'class-validator';

export class DeleteAccountDto {
  @IsNotEmpty()
  readonly login: string;
  @IsNotEmpty()
  readonly password: string;
}
