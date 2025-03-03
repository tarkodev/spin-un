import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import Room from "../../algo/roomModule/room";
import GameReseau from "../../algo/roomModule/gameReseau";
import Game from "../../algo/gameModule/game";
import Player from "../../algo/playerModule/player";
import Card from "../../algo/cardModule/card";

/**
 * NetGamePublicModel and NetRoomPublicModel TO DO!
 * Because now, the client can see everything, like the card that other player have
 * But for now (as a debug purpose) this is not implemented.
 */

export class NetGamePublicModel {

}

export class NetRoomPublicModel {

}



export class NetRoomModel {
  uuid: string;
  name: string;

  gameMaster: User['login'];
  players: User['login'][];

  status: RoomStatus;
  password: string;

  isInGame: boolean;
  isSpin: boolean;
  algoGame: GameReseau;

  public constructor(
      name: string,
      gameMaster: string,
  ) {
    this.uuid = uuidv4();
    this.name = name;
    this.gameMaster = gameMaster;
    this.players = [];

    this.status = RoomStatus.PUBLIC
    this.password = "";

    this.isInGame = false;
    this.algoGame = null;

    this.isSpin = false;
  }
}

export enum RoomStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
