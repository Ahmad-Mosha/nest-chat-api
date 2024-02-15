import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SessionGuard } from 'src/sessions/session.guard';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';
import { ApiOperation, ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
@UseInterceptors(LoggerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	@ApiOperation({ summary: 'Create a new user' })
	@ApiParam({ name: 'CreateUserDto', required: true })
	@ApiResponse({ status: 201, description: 'User created successfully' })
	async signup(@Body() createUserDto: CreateUserDto, @Req() req) {
		const user = await this.authService.signup(createUserDto);
		req.login(user, (err) => {
			if (err) throw err;
		});
		return user;
	}

	@UseGuards(SessionGuard)
	@ApiParam({ name: 'LoginDto', type: LoginDto, required: true })
	@Post('login')
	login(payload: LoginDto, @Req() req) {
		return req.user;
	}

	@Get('logout')
	logout(@Req() req) {
		req.session.destroy();
		return 'Logged out';
	}
}

