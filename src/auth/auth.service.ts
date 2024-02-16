import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bycrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AccountCredentials } from 'src/utils/types';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    /**
     * signing in with a super user that does not require a hashed password
     * then you can create users with hashed passwords
     */
    if (user.email === 'user@gmail.com') {
      return user;
    }
    const matched = await bycrypt.compare(password, user.password);
    if (user && matched) {
      return user;
    }
    throw new UnauthorizedException('Invalid password');
  }

  async OAuthValidate(accountData: AccountCredentials) {
    const account = await this.usersService.getOAuthAccount(
      accountData.id,
      accountData,
    );
    return account;
  }
  async signup(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
