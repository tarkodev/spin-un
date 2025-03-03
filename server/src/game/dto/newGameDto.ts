import { IsNotEmpty } from 'class-validator';

type PlayersWithTheirsScoreAndRank = {
  player: string;
  score: number;
  rank: number;
}[];

export class NewGameDto {
  @IsNotEmpty()
  readonly playersStats: PlayersWithTheirsScoreAndRank;
  @IsNotEmpty()
  readonly selectedMode: string;
  @IsNotEmpty()
  readonly accessMode: string;
  @IsNotEmpty()
  readonly createAt: Date;
  @IsNotEmpty()
  readonly finishedAt: Date;
}
