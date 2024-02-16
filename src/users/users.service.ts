import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/user.entity';
import { ObjectId, Repository } from 'typeorm';
import { hashPassword } from '../utils/bcrypt';
import { AccountCredentials } from 'src/utils/types';
import { Account } from 'src/typeorm/entities/account.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'MongoDB')
    private readonly userRepo: Repository<User>,
    @InjectRepository(Account, 'MongoDB')
    private readonly acccountRepo: Repository<Account>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = await hashPassword(createUserDto.password);
    const existingUser = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists.');
    }
    const user = this.userRepo.create({ ...createUserDto, password });
    return await this.userRepo.save(user);
  }
  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }

  async getAllUsers() {
    return await this.userRepo.find();
  }

  async findOne(id: ObjectId): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { _id: id } });
  }

  async getOAuthAccount(id: string, accountData: AccountCredentials) {
    const account = await this.acccountRepo.findOne({
      where: { id: id },
    });

    if (account) {
      return account;
    }
    const newAccount = this.acccountRepo.create(accountData);
    return await this.acccountRepo.save(newAccount);
  }
}
