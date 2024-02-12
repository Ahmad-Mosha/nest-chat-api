import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'The name of the user',
		type: String,
		required: true,
	})
	name: string;

	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({
		description: 'The email of the user',
		type: String,
		required: true,
	})
	email: string;

	@IsNotEmpty()
	@IsString()
	@Matches(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/, {
		message:
			'Password must be at least 8 characters long 1 lowercase letter, and 1 number',
	})
	@ApiProperty({
		description: 'The password of the user',
		type: String,
		required: true,
	})
	password: string;
}
