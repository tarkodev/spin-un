import { IsNotEmpty } from "class-validator";

export class UpdateUserProfileBioDto{
    @IsNotEmpty()
    readonly login: string;
    @IsNotEmpty()
    readonly newBio: string;
}