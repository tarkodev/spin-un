import { IsNotEmpty } from "class-validator";

export class UpdateUserProfilePasswordDto{
    @IsNotEmpty()
    readonly login: string;
    @IsNotEmpty()
    readonly newPassword: string;
}