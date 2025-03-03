import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

export class AuthenticatedSocketAdapter extends IoAdapter {
  private readonly authService: AuthService;

  constructor(app: INestApplicationContext) {
    super(app);
    this.authService = app.get(AuthService);
  }

  private validate = async (socket, next) => {

    const tokenPayload = socket.handshake?.auth.token;
    if (!tokenPayload) {
      return next(new Error('Token not found'));
    }



    const [method, token] = tokenPayload.split(' ');

    try {
      socket.user = {};
      const user = await this.authService.validateToken(token);
      socket.user = user;

      return next();
    } catch (error: any) {
      console.error(error);
      return next(new Error('Authentication error'));
    }
  };

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    // server.use(async (socket: any, next) => {
    //   // await this.validate(socket, next);
    // });

    server.of('network').use(async (socket: any, next) => {
      console.log('Lobby Auth Guard');
      console.log(next);
      await this.validate(socket, next);
    });

    return server;
  }
}
