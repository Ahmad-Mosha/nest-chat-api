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
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'MongoDB')
    private readonly userRepo: Repository<User>,
    private readonly accountService: AccountsService,
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

    const accont = await this.accountService.getAccount(email);
    return accont;
  }

  async getAllUsers() {
    return await this.userRepo.find();
  }

  async findOneById(id: ObjectId) {
    const user = await this.userRepo.findOne({ where: { _id: id } });
    if (!user) {
      throw new NotFoundException('No user was found by that id.');
    }
    return user;
  }
}
