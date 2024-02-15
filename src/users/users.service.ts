import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ObjectId, Repository } from 'typeorm';
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
		return await this.repository.save(user);
	}
	async getUserByEmail(email: string) {
		const user = await this.repository.findOne({ where: { email } });
		if (user) {
			return user;
		}
		throw new NotFoundException('User not found');
	}

	async getAllUsers() {
		return await this.repository.find();
	}

	async findOne(id: ObjectId): Promise<User | undefined> {
		return await this.repository.findOne({ where: { _id: id } });
	}
}
