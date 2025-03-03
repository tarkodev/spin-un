import { IsNotEmpty } from "class-validator";

export class UpdateUserProfileListEmojiDto{
    @IsNotEmpty()
    readonly login: string;
    @IsNotEmpty()
    readonly newListEmoji: string;
}