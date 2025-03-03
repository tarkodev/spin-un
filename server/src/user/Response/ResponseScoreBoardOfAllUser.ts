type ScoreBoard = {
    login: string;
    score: number;
}[];

export type ResponseScoreBoardOfAllUser = {
    status: number;
    error: string;
    scoreBoard: ScoreBoard;
};
