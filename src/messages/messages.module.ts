import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/typeorm/entities/message.entity';
import { MessagesController } from './messages.controller';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message], 'MongoDB'),
    ConversationsModule,
  ],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
