import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User, 'MongoDB')
		private readonly repository: Repository<User>,
	) {}

	create(createUserDto: CreateUserDto) {
		const user = new User();
		user.name = createUserDto.name;
		user.email = createUserDto.email;
		user.password = createUserDto.password;
		return this.repository.save(user);
	}

	// findAll() {
	//   return `This action returns all users`;
	// }

	// findOne(id: number) {
	//   return `This action returns a #${id} user`;
	// }

	// update(id: number, updateUserDto: UpdateUserDto) {
	//   return `This action updates a #${id} user`;
	// }

	// remove(id: number) {
	//   return `This action removes a #${id} user`;
	// }
}
