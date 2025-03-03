import { IsNotEmpty } from 'class-validator';

export class DeleteFriendDto {
    @IsNotEmpty()
    readonly login: string;
  @IsNotEmpty()
  readonly friendLogin: string;
}