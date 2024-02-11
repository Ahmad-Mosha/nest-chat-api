import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'MongoDB',
      type: 'mongodb',
      url: process.env.MONGO_URI,
      synchronize: true,
      database: 'chat-app',
      entities: [User],
    }),

    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
