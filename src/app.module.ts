import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { MessagesModule } from './messages/messages.module';
import { ConversationsModule } from './conversations/conversations.module';
import { AccountsModule } from './accounts/accounts.module';
import { ChatInvitaionsModule } from './chat-invitations/chat-invitations.module';
import {
  ChatInvitation,
  User,
  Account,
  Message,
  Conversation,
} from './typeorm/index';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'MongoDB',
      type: 'mongodb',
      url: process.env.MONGO_URI,
      synchronize: true,
      database: 'chat-app',
      entities: [User, Account, Message, Conversation, ChatInvitation],
    }),

    UsersModule,
    AuthModule,
    MessagesModule,
    ConversationsModule,
    AccountsModule,
    ChatInvitaionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
