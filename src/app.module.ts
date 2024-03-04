import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { Account } from './typeorm/entities/account.entity';
import { Message } from './typeorm/entities/message.entity';
import { Conversation } from './typeorm/entities/conversation.entity';
import { MessagesModule } from './messages/messages.module';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'MongoDB',
      type: 'mongodb',
      url: process.env.MONGO_URI,
      synchronize: true,
      database: 'chat-app',
      entities: [User, Account, Message, Conversation],
    }),

    UsersModule,
    AuthModule,
    MessagesModule,
    ConversationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
