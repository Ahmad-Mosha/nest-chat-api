import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

export class SessionSerializer extends PassportSerializer {
	constructor(private readonly userService: UsersService) {
		super();
	}

	serializeUser(user: Express.User, done: (err, user) => void) {
		done(null, user);
	}

	async deserializeUser(user: Express.User, done: (err, user) => void) {
		return done(null, user);
	}
}
