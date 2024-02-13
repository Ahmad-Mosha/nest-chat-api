import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from '../utils/bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User, 'MongoDB')
		private readonly repository: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto) {
		const password = await hashPassword(createUserDto.password);
		const user = this.repository.create({ ...createUserDto, password });
		return this.repository.save(user);
	}
	async getUserByEmail(email: string) {
		return this.repository.findOne({ where: { email } });
	}

	async getAllUsers() {
		return this.repository.find();
	}
}
