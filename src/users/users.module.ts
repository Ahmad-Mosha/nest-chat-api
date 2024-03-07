import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/user.entity';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'MongoDB'), AccountsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
