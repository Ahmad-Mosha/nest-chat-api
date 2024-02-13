import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../utils/bcrypt';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(email: string, pass: string) {
		const user = await this.usersService.getUserByEmail(email);
		if (user && (await comparePassword(pass, user.password))) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
}
