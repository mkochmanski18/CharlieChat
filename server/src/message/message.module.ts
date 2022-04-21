import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[UserModule,UserService],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
