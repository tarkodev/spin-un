import { IsNotEmpty } from "class-validator";

export class UpdateUserProfileScoreDto{
    @IsNotEmpty()
    readonly login: string;
    @IsNotEmpty()
    readonly newScore: number;
}