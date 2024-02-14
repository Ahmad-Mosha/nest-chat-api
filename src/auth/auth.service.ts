import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../utils/bcrypt';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.getUserByEmail(email);
		if (user && (await comparePassword(password, user.password))) {
			return user;
		}
		return null;
	}

	async signup(createUserDto: any) {
		return this.usersService.create(createUserDto);
	}
}
