import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { NewGameDto } from './dto/newGameDto';
import { ResponseNewGame } from './Response/ResponseNewGame';
import { ResponseUserHistoryGame } from './Response/ResponseUserHistoryGame';

@Controller('game')
export class GamesController {
  constructor(private gameService: GameService) { }

  /**
   * Permet de créer une game
   * @param newGameDto - Le client doit envoyer un json avec les attributs : playersStats (voir responseDto), selectedMode, accessMode, createAt et finishedAt
   * @returns Promise<ResponseNewGame> - L'API renvoit un json avec les attributs : status (code Http) et error (s'il y en a une)
   */
  @Post('new')
  createNewGame(@Body() newGameDto: NewGameDto): Promise<ResponseNewGame> {
    return this.gameService.createNewGame(newGameDto);
  }

  /**
   * Permet de récupérer l'historique de partie d'un joueur
   * @param login - Le client doit envoyer en paramètre de GET le login
   * @returns Promise<ResponseUserHistoryGame> - L'API renvoit un json avec les attributs: status (code http), error (s'il y en a une) et gameHistory
   */
  @Get('history/:login')
  getHistoryGameUser(
    @Param('login') login: string,
  ): Promise<ResponseUserHistoryGame> {
    return this.gameService.getHistoryGamePlayer(login);
  }
}
