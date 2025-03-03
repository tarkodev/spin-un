import { IsNotEmpty } from "class-validator";

export class UpdateUserProfileCoinDto{
    @IsNotEmpty()
    readonly login: string;
    @IsNotEmpty()
    readonly newCoin: number;
}