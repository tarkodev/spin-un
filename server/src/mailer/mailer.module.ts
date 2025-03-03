import { Global, Module } from "../../node_modules/@nestjs/common";
import { MailerService } from "./mailer.service";

@Global()
@Module({
  exports: [MailerService],
  providers: [MailerService],
})
export class MailerModule {}
