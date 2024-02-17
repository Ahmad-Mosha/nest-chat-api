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
import { SessionGuard } from 'src/guards/session.guard';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';
import { ApiOperation, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthGuard } from 'src/guards/googleAuth.guard';
import { TwitterAuthGuard } from 'src/guards/twitter-auth.guard';
@UseInterceptors(LoggerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    required: true,
    description: 'The user to create',
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async signup(@Body() createUserDto: CreateUserDto, @Req() req) {
    const user = await this.authService.signup(createUserDto);
    req.login(user, (err) => {
      if (err) throw err;
    });
    return user;
  }

  @UseGuards(SessionGuard)
  @ApiBody({
    type: LoginDto,
    required: true,
    description: 'The user to login',
  })
  @Post('login')
  login(@Body() payload: LoginDto, @Req() req) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/login')
  @ApiOperation({ summary: 'Login with Google' })
  handleGoogleLogin(@Req() req) {
    console.log(req);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/users')
  @ApiOperation({ summary: '' })
  handleGoogleRedirect() {
    return { msg: 'redirected' };
  }

  @Get('logout')
  logout(@Req() req) {
    req.session.destroy();
    return 'Logged out';
  }

  @UseGuards(TwitterAuthGuard)
  @Get('/twitter/login')
  @ApiOperation({ summary: 'Login with Twitter' })
  handleTwitterLogin(@Req() req) {
    console.log(req);
  }

  @UseGuards(TwitterAuthGuard)
  @Get('/twitter/callback')
  @ApiOperation({ summary: '' })
  handleTwitterRedirect() {
    return { msg: 'redirected' };
  }
}
