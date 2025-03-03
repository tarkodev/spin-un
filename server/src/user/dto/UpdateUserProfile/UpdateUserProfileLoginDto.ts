import { IsNotEmpty } from "class-validator";

export class UpdateUserProfileLoginDto{
    @IsNotEmpty()
    readonly login: string;
    @IsNotEmpty()
    readonly newLogin: string;
}