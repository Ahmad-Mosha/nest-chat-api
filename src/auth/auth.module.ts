import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { SessionSerializer } from 'src/sessions/session.serializer';
import { GoogleStrategy } from 'src/strategies/google.strategy';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
