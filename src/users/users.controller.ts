import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
@UseGuards(AuthenticatedGuard)
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({ summary: 'Create a user' })
	@ApiParam({ name: 'CreateUserDto', required: true })
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all users' })
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@Get(':email')
	@ApiOperation({ summary: 'Get user by email' })
	@ApiParam({ name: 'email', required: true })
	getUserByEmail(@Param('email') email: string) {
		return this.usersService.getUserByEmail(email);
	}
}
