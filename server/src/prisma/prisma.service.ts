import { Injectable } from '../../node_modules/@nestjs/common';
import { ConfigService } from '../../node_modules/@nestjs/config';
import { PrismaClient } from '../../node_modules/@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    console.log(configService.get('DATABASE_URL'));
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }
}
