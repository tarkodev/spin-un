export type ScoreBoardOfMyFriend = {
    login: string;
    score: number;
}[];

export type ResponseScoreBoardMyfriend = {
    status: number;
    error: string;
    scoreBoard: ScoreBoardOfMyFriend;
};
