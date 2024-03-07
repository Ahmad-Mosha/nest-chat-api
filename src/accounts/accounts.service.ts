import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/typeorm/entities/account.entity';
import { Repository } from 'typeorm';
import { AccountCredentials } from 'src/utils/types';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account, 'MongoDB')
    private readonly accountRepo: Repository<Account>,
  ) {}

  async getOAuthAccount(id: string, accountData: AccountCredentials) {
    const account = await this.accountRepo.findOne({
      where: { id: id },
    });

    if (account) {
      return account;
    }
    const newAccount = this.accountRepo.create(accountData);
    return await this.accountRepo.save(newAccount);
  }

  async getAccount(email: string) {
    const account = await this.accountRepo.findOne({ where: { email } });
    if (!account) {
      throw new NotFoundException('No email was found');
    }
    return account;
  }
}
