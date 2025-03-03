import {
  Injectable,
  UnauthorizedException,
} from '../../node_modules/@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '../../node_modules/@nestjs/passport';
import { ConfigService } from '../../node_modules/@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

type Payload = {
  sub: number;
  login: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_KEY'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: payload.login },
      });
      if (!user) {
        throw new UnauthorizedException('Accées non authorisé');
      }
      return user;
    } catch (e) {
      return e;
    }
  }
}
