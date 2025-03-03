type Game = {
  finishedAt: Date;
  beganAt: Date;
};
type Player = {
  score: number;
  userLogin: string;
  rankInGame: number;
}[];

export type GameHistory = {
  game: Game;
  player: Player;
}[];

export type ResponseUserHistoryGame = {
  status: number;
  error: string;
  gameHistory: GameHistory;
};
