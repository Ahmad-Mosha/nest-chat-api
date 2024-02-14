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
		return this.repository.save(user);
	}
	async getUserByEmail(email: string) {
		const user = this.repository.findOne({ where: { email } });
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	async getAllUsers() {
		return this.repository.find();
	}

	async findOne(id: ObjectId): Promise<User | undefined> {
		return this.repository.findOne({ where: { _id: id } });
	}
}
