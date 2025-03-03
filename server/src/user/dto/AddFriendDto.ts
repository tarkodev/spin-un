import { IsNotEmpty } from 'class-validator';

export class AddFriendDto {
  @IsNotEmpty()
  readonly login: string;
  @IsNotEmpty()
  readonly friendLogin: string;
}
