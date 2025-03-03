import { Global, Module } from '../../node_modules/@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Global()
@Module({
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
