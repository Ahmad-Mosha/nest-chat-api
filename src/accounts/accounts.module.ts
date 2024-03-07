import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/typeorm/entities/account.entity';

@Module({
  providers: [AccountsService],
  imports: [TypeOrmModule.forFeature([Account], 'MongoDB')],
  exports: [AccountsService],
})
export class AccountsModule {}
