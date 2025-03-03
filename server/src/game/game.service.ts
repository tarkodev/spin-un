import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewGameDto } from './dto/newGameDto';
import { ResponseNewGame } from './Response/ResponseNewGame';
import {
  GameHistory,
  ResponseUserHistoryGame,
} from './Response/ResponseUserHistoryGame';

@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) { }

  async createNewGame(newGameDto: NewGameDto): Promise<ResponseNewGame> {
    const { playersStats, selectedMode, accessMode, createAt, finishedAt } =
      newGameDto;
    const createDate = new Date(createAt);
    const finishedDate = new Date(finishedAt);
    let res: ResponseNewGame;

    // On vérifie que les joueurs existent bien dans la base de données
    try {
      for (var player of playersStats) {
        const user = await this.prismaService.user.findUnique({
          where: { login: player.player },
        });

        if (!user) {
          return (res = {
            status: 404,
            error: 'Aucun utilisateur avec ce login',
          });
        }
      }

      // Création de la partie
      const game = await this.prismaService.game.create({
        data: {
          selectedMode: selectedMode,
          accessMode: accessMode,
          beganAt: createDate,
          finishedAt: finishedDate,
        },
      });

      // On ajoute les joueurs dans la partie
      for (var player of playersStats) {
        await this.prismaService.userGame.create({
          data: {
            gameId: game.id,
            userLogin: player.player,
            rankInGame: player.rank,
            score: player.score,
          },
        });
      }

      return (res = {
        status: 201,
        error: null,
      });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async getHistoryGamePlayer(login: string): Promise<ResponseUserHistoryGame> {
    let res: ResponseUserHistoryGame;
    let gameHistory: GameHistory = [];

    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'Aucun utilisateur avec ce login',
          gameHistory: null,
        });
      }
      // On récupère toutes les parties du joueur
      const userGames = await this.prismaService.userGame.findMany({
        take: 10,
        where: { userLogin: login },
        select: {
          game: {
            select: {
              id: true,
              beganAt: true,
              finishedAt: true,
            },
          },
        },
      });

      // Parcours de toutes les parties
      for (const game of userGames) {
        // On récupère les autres joueurs dans la partie
        const player = await this.prismaService.userGame.findMany({
          where: { gameId: game.game.id },
          select: {
            userLogin: true,
            score: true,
            rankInGame: true,
          },
        });
        // Union de game et player
        const unionGamePlayer = {
          game: {
            beganAt: game.game.beganAt,
            finishedAt: game.game.finishedAt,
          },
          player: player,
        };
        // Ajout dans le tableau
        gameHistory.push(unionGamePlayer);
      }
      return (res = {
        status: 200,
        error: null,
        gameHistory: gameHistory,
      });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
        gameHistory: null,
      });
    }
  }
}
