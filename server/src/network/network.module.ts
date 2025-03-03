import { Module } from '@nestjs/common';
import {NetworkGateway} from "./network.gateway";
import {NetGameService} from "./netgame/netgame.service";
import {NetRoomService} from "./netroom/netroom.service";

@Module({
  imports: [  ],
  providers: [ NetworkGateway, NetGameService, NetRoomService ]
})

export class NetworkModule {}
