import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/typeorm/entities/message.entity';
import { MessagesController } from './messages.controller';
import { Conversation } from 'src/typeorm/entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation], 'MongoDB')],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
