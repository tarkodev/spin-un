import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GamesController } from './game.controller';

@Module({
  providers: [GameService],
  controllers: [GamesController],
})
export class GameModule {}
