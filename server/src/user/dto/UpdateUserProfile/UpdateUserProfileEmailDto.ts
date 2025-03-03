import { IsNotEmpty } from "class-validator";

export class UpdateUserProfileEmailDto{
    @IsNotEmpty()
    readonly login: string;
    @IsNotEmpty()
    readonly newEmail: string;
}