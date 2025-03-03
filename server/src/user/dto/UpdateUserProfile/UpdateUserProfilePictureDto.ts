import { IsNotEmpty } from "class-validator";

export class UpdateUserProfilePictureDto{
    @IsNotEmpty()
    readonly login: string;
    @IsNotEmpty()
    readonly newProfilePicture: number;
}