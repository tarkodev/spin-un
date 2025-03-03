import { Injectable, NotFoundException } from '@nestjs/common';
import { NetRoomModel, RoomStatus } from './netroom.model';
import Real from "../../algo/playerModule/real";
import IA from "../../algo/playerModule/ia";
import Room from "../../algo/roomModule/room";
import {Server} from "socket.io";

@Injectable()
export class NetRoomService {

  // Bad Injection to fix
  public server: Server;

  private roomMap: Map<string, NetRoomModel> = new Map();

  private nbPlayersMax = 10;

  /**
   * ROOM MAP
   */

  getRoomMap() {
    return this.roomMap;
  }

  getRoomUuidFromUserLogin(userLogin: string): string | null {
    for (let [roomUuid, room] of this.roomMap.entries()) {
      if (room.players.includes(userLogin)) {
        return roomUuid;
      }
    }

    return null;
  }

  /**
   * ROOM ACTION
   */

  createRoomAction(roomName: string, userLogin: string) {
    let room = new NetRoomModel(roomName, userLogin);

    room.players.push(userLogin);

    this.roomMap.set(room.uuid, room);

    console.log(this.roomMap)
    this.launchGame(room.uuid);

    return { roomUuid: room.uuid };
  }

  joinRoomAction(roomUuid: string, userLogin: string) {
    let room = this.roomMap.get(roomUuid);

    if (!room) {
      throw new NotFoundException(`Room with uuid ${roomUuid} not found!`);
    }

    if(room.players.includes(userLogin)) {
      throw new Error('Player already in the netroom');
    }

    if (room.players.length >= this.nbPlayersMax) {
      throw new Error('No place left in the netroom: number of players max reached');
    }

    room.players.push(userLogin);

    return { success: true };
  }

  leaveRoomAction(roomUuid: string, userLogin: string) {
    let room = this.roomMap.get(roomUuid);

    if (!room) {
      throw new NotFoundException(`Room with uuid ${roomUuid} not found!`);
    }

    const index = room.players.indexOf(userLogin);
    if (index != -1) {
      room.players.splice(index, 1);
      if(room.players.length != 0 && room.gameMaster == userLogin) {
        let newGameMaster = room.players[0];
        room.gameMaster = newGameMaster
        return { success: true, newGameMaster: newGameMaster};
      }
    } else {
      throw new NotFoundException(`Player with id ${userLogin} not found!`);
    }

    if(room.players.length == 0) {
      this.roomMap.delete(roomUuid);
    }

    return { success: true };
  }

  deleteRoomAction(roomUuid: string, userLogin: string) {
    let room = this.roomMap.get(roomUuid);

    if (!room) {
      throw new NotFoundException(`Room with uuid ${roomUuid} not found!`);
    }

    if (userLogin != room.gameMaster) {
      throw new Error('Not authorized : Only the gameMaster can delete a netroom');
    }

    this.roomMap.delete(roomUuid);

    return { success: true };
  }

  launchGame(roomUuid: string) {
    let roomNetwork = this.roomMap.get(roomUuid);

    /*roomNetwork.isInGame = true;

    roomNetwork.algoRoom = new Room(0, 10, 4);

    roomNetwork.algoRoom.playersList[0] = new Real("Joueur Réel");
    for (let i = 1; i < 4; i++) {
      roomNetwork.algoRoom.playersList[i] = new IA(`Bot ${i}`);
    }
    roomNetwork.algoRoom.gameStart();*/
  }
}
