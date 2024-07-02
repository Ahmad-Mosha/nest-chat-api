import { Module } from '@nestjs/common';
import { ChatInviationService } from './chat-invitations.service';
import { ChatInvitationController } from './chat-invitations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatInvitation } from 'src/typeorm/entities/chat-invitation';
import { UsersModule } from 'src/users/users.module';
import { Conversation } from 'src/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatInvitation, Conversation], 'MongoDB'),
    UsersModule,
  ],
  providers: [ChatInviationService],
  controllers: [ChatInvitationController],
})
export class ChatInvitaionsModule {}
