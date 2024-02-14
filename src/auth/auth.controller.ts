import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { SessionGuard } from 'src/sessions/session.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	async signup(@Body() createUserDto: CreateUserDto, @Req() req: any) {
		const user = await this.authService.signup(createUserDto);
		req.login(user, (err) => {
			if (err) throw err;
		});
		return user;
	}

	@UseGuards(SessionGuard)
	@Post('login')
	async login(@Body() loginDto: LoginDto, @Req() req: any) {
		return req.user;
	}

	@Get('logout')
	async logout(@Req() req) {
		req.session.destroy();
		return 'Logged out';
	}
}
