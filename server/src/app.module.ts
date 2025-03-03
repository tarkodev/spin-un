import { Module } from '../node_modules/@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '../node_modules/@nestjs/config';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';
import { GameModule } from './game/game.module';
import { ChatModule } from './network/chat/chat.module';
import * as path from 'path';
import {NetworkModule} from "./network/network.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '.env'),
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    MailerModule,
    GameModule,

    NetworkModule,

    ChatModule
  ],
})
export class AppModule {}
