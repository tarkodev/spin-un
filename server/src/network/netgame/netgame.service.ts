import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NetRoomService } from '../netroom/netroom.service';
import { UserService } from '../../user/user.service';
import Room from '../../algo/roomModule/room';
import Card from '../../algo/cardModule/card';
import { NetworkGateway } from '../network.gateway';
import IA from '../../algo/playerModule/ia';
import NumerotedCard from '../../algo/cardModule/numerotedCard';
import Player from '../../algo/playerModule/player';
import { NetRoomModel } from '../netroom/netroom.model';
import { Server } from 'socket.io';

@Injectable()
export class NetGameService {
  //roomUuid / intervalId
  private roomUuidIntervalMap: Map<string, NodeJS.Timeout> = new Map();
  private timer: number = 60;

  constructor(private netRoomService: NetRoomService) { }

  test() {
    console.log('heyy');
  }

  /**
   * UTILS
   */

  checkAndGetRoom(userLogin: string) {
    let roomUuidFromUserLogin =
      this.netRoomService.getRoomUuidFromUserLogin(userLogin);

    if (roomUuidFromUserLogin == null) {
      throw new Error('Room Not Found From User');
    }

    let room = this.netRoomService.getRoomMap().get(roomUuidFromUserLogin);

    if (!room.isInGame) {
      throw new Error('Not Ingame');
    }

    return room;
  }

  /**
   * Play
   */

  /**
   * Tente de jouer une carte. Retourne un objet indiquant le succès de l'action.
   */

  jouerCarteAction(userLogin: string, cardIndex: number) {
    try {
      const room = this.checkAndGetRoom(userLogin);
      // Votre logique pour jouer une carte, par exemple :
      // const result = netroom.jouerCarte(userLogin, cardIndex);
      // Assumez que result est un booléen indiquant le succès
      const success = true; // Remplacez par votre logique réelle
      if (success) {
        return { success: true };
      } else {
        return { success: false, message: 'Impossible de jouer cette carte' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  /**
   * Presser Uno. Retourne un objet indiquant le succès de l'action.
   */
  presserUnoAction(userLogin: string, roomUuid: string) {
    // Votre logique pour presser Uno
    try {
      const room = this.checkAndGetRoom(userLogin);
      // Assumez que presserUno est un booléen indiquant le succès
      const success = true; // Remplacez par votre logique réelle
      if (success) {
        return { success: true };
      } else {
        return { success: false, message: 'Action Uno échouée' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  updateBoardAction() { }

  piocherCarteAction(userLogin: string, playerIndex: number) { }

  /**
   * APRES
   *
   */

  public startGameLoop(roomNetwork: NetRoomModel, room: Room) {
    this.roomUuidIntervalMap.set(
      roomNetwork.uuid,
      setInterval(() => {
        const currentPlayer = room.playersList[room.whosTurn];

        if (currentPlayer instanceof IA) {
          console.log(`Tour du bot: ${room.whosTurn}`);
          this.botPlay(room);
        } else {
          console.log(`Tour du joueur réel: ${room.whosTurn}`);
          this.printInfo(
            room.game.cardDeposit,
            room.playersList[room.whosTurn],
          );
        }
      }, 1000),
    ); // Chaque seconde
  }

  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async botPlay(room: Room) {
    console.log(`Bot ${room.whosTurn} joue.`);

    // Introduire un délai de 2000 ms
    await this.delay(2000);

    const player = room.playersList[room.whosTurn] as IA;
    const canPlay = player.playableRandomCard(room.game.cardDeposit);

    if (!canPlay) {
      /*
       * Piocher une carte si aucune cartes n'est jouée
       */
      console.log(
        `Aucune carte jouable. Le bot ${room.whosTurn} pioche une carte.`,
      );
      player.drawCard(room.game.drawStack, room.game.cardDeposit);
    } else {
      console.log(`Le bot ${room.whosTurn} joue une carte.`);
    }

    //   // Joue une carte ou pioche après un délai
    //   setTimeout(() => {
    //     if (
    //       !(room.playersList[room.whosTurn] as IA).playableRandomCard(
    //         room.game.cardDeposit,
    //       )
    //     ) {
    //       /*
    //        * Piocher une carte si aucune cartes n'est jouée
    //        */ room.playersList[room.whosTurn].drawCard(
    //         room.game.drawStack,
    //         room.game.cardDeposit,
    //       );
    //     }
    //   }, 2000);
  }
  /**
   * DEROULEMENT
   */

  /* Fonction pour obtenir le code ANSI de couleur en fonction du nom de la couleur */
  colorCode(color: string): string {
    switch (color.toLowerCase()) {
      case 'green':
        return '\x1b[32m'; // Vert
      case 'red':
        return '\x1b[31m'; // Rouge
      case 'blue':
        return '\x1b[34m'; // Bleu
      case 'yellow':
        return '\x1b[33m'; // Jaune
      default:
        return '\x1b[0m'; // Par défaut, réinitialisation des styles
    }
  }

  /* Affiche d'un tableau de cartes */
  printCardArray(cardArray: Card[]): void {
    const reset = '\x1b[0m';
    let count: number = 0;
    console.log('Number of cards :', cardArray.length);
    for (const card of cardArray) {
      if (card instanceof NumerotedCard) {
        const color: string = this.colorCode(card.color);
        console.log(`${count} ${color}${card.color}, ${card.number}${reset}`);
        count++;
      }
    }
    console.log();
  }

  printInfo(cardDeposit: Card[], player: Player): void {
    console.log('card deposit :');
    this.printCardArray(cardDeposit);
    console.log(player.login, 'hand: ');
    this.printCardArray(player.hand);
  }

  /*private handlePlayCard(room: Room, playerIndex: number, chosenCardIndex: number) {
            let player = room.playersList[room.whosTurn];
            let validPlay: boolean;
            // jouer une carte
            console.log(`Joueur ${room.whosTurn} joue la carte ${chosenCardIndex}.`);
    
            if (chosenCardIndex >= 0 && chosenCardIndex <= player.hand.length - 1) {
                const chosenCard: Card = player.hand[chosenCardIndex];
                validPlay = player.playCard(chosenCard, room.game.cardDeposit).succes;
                if (!validPlay) {
                    console.log("Cannot play this card. Please choose another one.");
                } else {
                    console.log("validPlay!")
                }
            } else {
                console.log("Invalid index. Please choose a valid index.");
                validPlay = false; // Réinitialiser la validité du jeu pour sortir de la boucle
            }
        }*/

  private handleDrawCard(room: Room, playerIndex: number) {
    // Logique pour piocher une carte
    console.log(`Joueur ${room.whosTurn} pioche une carte.`);
    const player = room.playersList[room.whosTurn];
    //player.drawCard(netroom.game.drawStack);
    room.game.remakeDrawStackIfNoCardIn();
  }

  private resetTimerForNextTurn() {
    this.timer = 60;
    console.log('Timer réinitialisé pour le prochain tour.');
  }

  endGame() {
    //clearInterval(this.gameInterval); // Arrêter le jeu
    console.log('Fin de la partie.');

    /*this.roomGateway.server.emit('endGame', {
                });*/
  }

  private broadcastGameState() {
    /*this.roomGateway.server.emit('gameState', {
        
                });*/
  }
}
