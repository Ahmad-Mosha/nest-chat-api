import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/user.entity';
import { Account } from 'src/typeorm/entities/account.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, Account], 'MongoDB')],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
