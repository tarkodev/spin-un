import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { NetRoomService } from './netroom/netroom.service';
import { Mode } from '../algo/roomModule/room';
import { NetGameService } from './netgame/netgame.service';
import GameReseau from '../algo/roomModule/gameReseau';
import Real from '../algo/playerModule/real';
import { changeTurnPlayer } from 'src/algo/roomModule/deroulement/deroulement';
import { plainToInstance } from 'class-transformer';

/**
 * Extends Socket with a user property for easy access to user information
 */
type UserSocket = Socket & {
  user: {
    login: string;
  };
};

@WebSocketGateway({ namespace: 'network', transports: ['websocket'] })
export class NetworkGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private userService: UserService,
    private netRoomService: NetRoomService,
    private netGameService: NetGameService,
  ) {}

  private getUserIdFromLogin(userId) {
    return this.userService.getUserProfile(userId);
  }

  /**
   * Lifecycle hooks
   * https://docs.nestjs.com/websockets/gateways
   */

  afterInit() {
    console.log('Lobby: Init');
    this.netRoomService.server = this.server;
  }

  handleConnection(client: UserSocket) {
    console.log(`Client connected: ${client.id}`, client.user.login);
  }

  handleDisconnect(client: UserSocket) {
    console.log(`Client disconnected: ${client.id}`, client.user.login);

    let foundRoomUuid: string = this.netRoomService.getRoomUuidFromUserLogin(
      client.user.login,
    );
    if (foundRoomUuid != null) {
      this.netRoomService.leaveRoomAction(foundRoomUuid, client.user.login);
    }
  }

  /**
   * Envoie les données de toute les rooms au client qui en fait la demande.
   * @param client from websocket as a Socket object
   * @emits allRoomData { success as a true boolean, data as a RoomNetwork array }
   * TO DO FOR SECURITY: GIVE NetRoomPublicModel INSTEAD OF NetRoomModel
   */
  @SubscribeMessage('getAllRoomData')
  async handleGetAllRoom(@ConnectedSocket() client: Socket) {
    const allRoomData = Array.from(this.netRoomService.getRoomMap().values()); // Les données du netroommodel
    client.emit('allRoomData', { success: true, data: allRoomData }); // Envoie les données au client
  }

  /**
   * Récupère les détails de la salle actuelle pour un utilisateur et les envoie au client.
   * Si l'utilisateur n'est dans aucune salle, envoie un message indiquant qu'aucune salle n'a été trouvée.
   * @param client from websocket as a UserSocket object
   * @emits currentRoomData { success as a true boolean, data as a RoomNetwork object }
   * @emits currentRoomDataNotFound { success as a false boolean }
   */
  @SubscribeMessage('getCurrentRoomData')
  async handleGetCurrentRoomData(@ConnectedSocket() client: UserSocket) {
    const userId = client.user.login;
    let foundRoom = this.netRoomService.getRoomUuidFromUserLogin(userId);

    if (foundRoom) {
      client.emit('currentRoomData', {
        success: true,
        data: this.netRoomService.getRoomMap().get(foundRoom),
      });
    } else {
      client.emit('currentRoomDataNotFound', {
        success: false,
        message: 'No netroom found for the user.',
      });
    }
  }

  /**
   * Create a netroom from the lobby with the client as the gameMaster
   * @param client from websocket as a UserSocket object
   * @param roomName name of the netroom to create as a string
   * @emits roomCreated { success as a true boolean, data as a RoomNetwork object }
   * @emits roomCreatedFailed { success as a false boolean, message as a string }
   */
  @SubscribeMessage('createRoom')
  async handleCreateroom(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() roomName: string,
  ) {
    try {
      const result = this.netRoomService.createRoomAction(
        roomName,
        client.user.login,
      );
      client.join(result.roomUuid);
      client.emit('roomCreated', { success: true, roomUuid: result.roomUuid });
    } catch (e) {
      client.emit('roomCreationFailed', { success: false, message: e.message });
    }
  }

  /**
   * Makes a client join a netroom and it's correspondant socket netroom using the netroom's uuid
   * @param client from websocket as a UserSocket object
   * @param roomUuid uuid of the netroom as a string
   * @emits roomJoined { success as a true boolean }
   * @emits roomJoinedFailed { success as a false boolean, message as a string }
   */
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() roomUuid: string,
  ) {
    try {
      console.log('wtf');
      this.netRoomService.joinRoomAction(roomUuid, client.user.login);
      client.join(roomUuid);
      client.emit('roomJoined', { success: true });
    } catch (e) {
      client.emit('roomJoinFailed', { success: false, message: e.message });
    }
  }

  /**
   * Makes a client leave a netroom and it's correspondant socket netroom using the netroom's uuid
   * @param client from websocket as a UserSocket object
   * @param roomUuid uuid of the netroom as a string
   * @emits roomLeaved { success as a true boolean }
   * @emits roomLeavedFailed { success as a false boolean, message as a string }
   */
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() roomUuid: string,
  ) {
    try {
      this.netRoomService.leaveRoomAction(roomUuid, client.user.login);
      client.leave(roomUuid);
      client.emit('roomLeaved', { success: true });
    } catch (e) {
      client.emit('roomLeavedFailed', { success: false, message: e.message });
    }
  }

  /**
   * Allow the game master only to delete his netroom using the netroom's uuid
   * @param client from websocket as a UserSocket object
   * @param roomUuid uuid of the netroom as a string
   * @emits roomDeleted { success as a true boolean }
   * @emits roomDeletedFailed { success as a false boolean, message as a string }
   */
  @SubscribeMessage('deleteRoom')
  async handleDeleteRoom(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() roomUuid: string,
  ) {
    try {
      this.netRoomService.deleteRoomAction(roomUuid, client.user.login);
      this.server.to(roomUuid).emit('roomDeleted', { success: true });
    } catch (e) {
      client.emit('roomDeletedFailed', { success: false, message: e.message });
    }
  }

  /**
   * Send Game Room Data
   * @param client from websocket as a UserSocket object
   * @param roomUuid uuid of the netroom as a string
   * @param data uuid is mandatory, other value is optional: {
   *  uuid: room uuid string,
   *  ready: boolean,
   *  kick: player uuid string,
   *  name: new netroom name string,
   *  password: new password string,
   *  private: boolean,
   *  maxPlayer: int
   *  playCard: number,
   *  drawCard: boolean,
   *  name: new netroom name string,
   *  password: new password string,
   *  private: boolean,
   *  maxPlayer: int
   * }
   */
  @SubscribeMessage('sendActionData')
  async handleSendActionGameData(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() data: any,
  ) {
    if (this.netRoomService.getRoomMap().has(data.uuid)) {
      const room = this.netRoomService.getRoomMap().get(data.uuid);

      if (room.players.includes(client.user.login)) {
        if (typeof data.playCard === 'number') {
          if(!room.algoGame.room.isBlocked){
            if (
              client.user.login ===
                room.algoGame.room.playersList[room.algoGame.room.whosTurn]
                  .login
            ) {
              if (
                room.algoGame.playCardReseau(
                  room.algoGame.room.playersList[room.algoGame.room.whosTurn],
                  data.playCard,
                ).succes
              ) {
                /*
                              room.algoGame.checkEffectOfTopOfDeposit();
                              room.algoGame.changeTurnPlayer();
                              */

                /*
                                //ici ca serait plutot :

                                if(room.algoGame.checkIfJokerOrSuperJoker() === true) {
                                  //attendre un paquet avec la couleur choisie
                                  //de forme : data.chosenColor
                                  console.log("joker !!!")

                                  //while(data.chosenColor !== "blue" && data.chosenColor !== "red" && data.chosenColor !== "yellow" && data.chosenColor !== "green")

                                  if(data.chosenColor === "blue") {

                                  }

                                  client.emit('color?', {})

                                }
                                */
                //room.algoGame.checkEffectOfTopOfDepositJokerOrSuperJoker("blue")
                room.algoGame.checkEffectOfTopOfDeposit('blue');
                room.algoGame.changeTurnPlayer();
              }
            }
          }
          else{
            console.log("C'est bloqué");
          }
        }


        if (data.chosenColorToDiscard) {
        }

        if (data.chosenColor) {
          if(!room.algoGame.room.isBlocked){
            let index_color = data.chosenColor.split(/,| /);
            if (
              client.user.login ===
              room.algoGame.room.playersList[room.algoGame.room.whosTurn].login
            ) {
              if (
                room.algoGame.playCardReseau(
                  room.algoGame.room.playersList[room.algoGame.room.whosTurn],
                  index_color[0],
                ).succes
              ) {
                room.algoGame.checkEffectOfTopOfDeposit(index_color[1]);
                room.algoGame.changeTurnPlayer();
              }
            }
          }
        }

        if (data.drawCard) {
          if(!room.algoGame.room.isBlocked){
          /*if(room.algoGame.drawCardReseau(room.algoGame.room.playersList[room.algoGame.room.whosTurn]).succes)
                      room.algoGame.changeTurnPlayer();*/
              if (
                room.algoGame.drawCardReseau(
                  room.algoGame.room.playersList[room.algoGame.room.whosTurn],
                ).succes
              )
                room.algoGame.changeTurnPlayer();
            }
        }

        /****************************************/
        /*********** ACCES A GAME OU RETOUR A ROOM ***********/
        /****************************************/
        if (data.endGame) {
          room.algoGame = null;
        }

        /****************************************/
        /*********** CHOIX DU GAMEMODE DANS ROOM ***********/
        /****************************************/
        if (data.setMode) {
          if (typeof data.setMode === 'string') {
            room.isSpin = true;
          } else {
            room.isSpin = false;
          }
        }

        /****************************************/
        /*********** BOUTTONS CONFIGURABLES ***********/
        /****************************************/
          if (data.testButton) {
            if (data.testButton) {
              if (typeof data.testButton === 'string') {
                room.algoGame.room.isBlocked = false;
                console.log(room.algoGame.room.isBlocked)
            
                room.algoGame.wheelEffect = parseInt(data.testButton) - 1;
                room.algoGame.room.playersList[
                  room.algoGame.room.whosTurn
                ].treatmentChallengeWheel(
                  room.algoGame.wheelEffect,
                  room.algoGame.room.playersList,
                  room.algoGame.room.game.drawStack,
                  room.algoGame.room.game.cardDeposit,
                  "Paramètre additionnel"
              );

              room.algoGame.room.isBlocked = false;
              //room.algoGame.checkEffectOfTopOfDeposit('blue');
              room.algoGame.changeTurnPlayer();
            }
          }
        }

        /****************************************/
        /*********** JOUER JEU 1 2 3 avec param ***********/
        /****************************************/
        if (data.jeuParam) {
            room.algoGame.room.isBlocked = false;
            let index = data.jeuParam.split(/;| /);

                console.log(room.algoGame.room.isBlocked)
            
                room.algoGame.wheelEffect = parseInt(index[0]);
                room.algoGame.room.playersList[
                  room.algoGame.room.whosTurn
                ].treatmentChallengeWheel(
                  room.algoGame.wheelEffect,
                  room.algoGame.room.playersList,
                  room.algoGame.room.game.drawStack,
                  room.algoGame.room.game.cardDeposit,
                  index[1]
              );

              room.algoGame.room.isBlocked = false;
              //room.algoGame.checkEffectOfTopOfDeposit('blue');
              room.algoGame.changeTurnPlayer();
        }

        /****************************************/
        /*********** WHEEL EFFECT DEFINI POUR LES CLIENTS ***********/
        /****************************************/
        if(data.wheelEffect) {
          if(typeof data.wheelEffect === 'number') {
            room.algoGame.wheelEffect = data.wheelEffect -1;
          }
        }

        /****************************************/
        /*********** PIOCHE 2 CARTES SI UNO PAS DIT ***********/
        /****************************************/
        if(data.unoNotSaid) {
          console.log("entree pioche")
          let playerindex= parseInt(data.unoNotSaid);
          if (room.algoGame.room.playersList[playerindex].mustSayUno){
            room.algoGame.room.drawTwoOrFourCards(room.algoGame.room.playersList[playerindex],2 );
            room.algoGame.room.playersList[playerindex].mustSayUno =false;
            console.log("pioche 2 cartes pas uno")
          }
        }

        /****************************************/
        /*********** DIT UNO ***********/
        /****************************************/
        if(data.sayUno) {
          console.log("entree start uno")
          let playerindex= parseInt(data.sayUno);
          if (room.algoGame.room.playersList[playerindex].mustSayUno){
            room.algoGame.room.playersList[playerindex].sayUno();
            console.log("UNOOOO")
          }
        }

        /****************************************/
        /*********** DEMARRAGE DU JEU EN CLASSIC OU SPIN ***********/
        /****************************************/
        if (data.test !== undefined) {
          if (room.isSpin) {
            if (room.players.length === 1) {
              room.algoGame = new GameReseau(Mode.spin, 10, 4, [
                new Real(client.user.login),
              ]);
            }
            if (room.players.length === 2) {
              room.algoGame = new GameReseau(Mode.spin, 10, 4, [
                new Real(room.players[0]),
                new Real(room.players[1]),
              ]);
            } else if (room.players.length === 3) {
              room.algoGame = new GameReseau(Mode.spin, 10, 4, [
                new Real(room.players[0]),
                new Real(room.players[1]),
                new Real(room.players[2]),
              ]);
            } else if (room.players.length === 4) {
              room.algoGame = new GameReseau(Mode.spin, 10, 4, [
                new Real(room.players[0]),
                new Real(room.players[1]),
                new Real(room.players[2]),
                new Real(room.players[3]),
              ]);
            } else {
              // plus que 4 ?
            }
          } else {
            if (room.players.length === 1) {
              room.algoGame = new GameReseau(Mode.classic, 10, 4, [
                new Real(client.user.login),
              ]);
            }
            if (room.players.length === 2) {
              room.algoGame = new GameReseau(Mode.classic, 10, 4, [
                new Real(room.players[0]),
                new Real(room.players[1]),
              ]);
            } else if (room.players.length === 3) {
              room.algoGame = new GameReseau(Mode.classic, 10, 4, [
                new Real(room.players[0]),
                new Real(room.players[1]),
                new Real(room.players[2]),
              ]);
            } else if (room.players.length === 4) {
              room.algoGame = new GameReseau(Mode.classic, 10, 4, [
                new Real(room.players[0]),
                new Real(room.players[1]),
                new Real(room.players[2]),
                new Real(room.players[3]),
              ]);
            } else {
              // plus que 4 ?
            }
          }
          console.log(
            this.netRoomService.getRoomMap().get(data.uuid).algoGame.room
              .playersList[0].hand,
          );
        }
      }

      /*
            /**
             * J'essaye de coprendre comment ca marche tout ca ouais
             * @param client from websocket as a UserSocket object
             * @emits currentRoomData { success as a true boolean, data as a RoomNetwork object }
             * @emits currentRoomDataNotFound { success as a false boolean }

            @SubscribeMessage('askColor')
            async askColor(@ConnectedSocket() client: UserSocket) {
              const userId = client.user.login;
              let foundRoom = this.netRoomService.getRoomUuidFromUserLogin(userId);

              if (foundRoom) {
                client.emit('askColorTrue', { success: true, data: true });
              } else {
                client.emit('askColorFalse', { success: false, data: false });
              }
            }*/
    }
  }
  /**
   * Broadcast the incomming message to all user in the same room.
   * @param client
   * @param data
   */

  @SubscribeMessage('chat-message')
  handleChatMessage(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() data: string,
  ) {
    // Recuperate roomUuid
    let roomUuid: string = this.netRoomService.getRoomUuidFromUserLogin(
      client.user.login,
    );

    if (!roomUuid) {
      throw new Error('no room found');
    }

    // Broadcast the message to all user in the room
    this.server.in(roomUuid).emit('chat-message', client.user.login, data);
  }
}
