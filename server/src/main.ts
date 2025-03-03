import { NestFactory } from '../node_modules/@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '../node_modules/@nestjs/common';
import { AuthenticatedSocketAdapter } from './network/auth-adapter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useWebSocketAdapter(new AuthenticatedSocketAdapter(app));
  await app.listen(10004);
}
bootstrap();
