import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/users',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { displayName, provider, id } = profile;
    const email = profile.emails[0].value;
    const image = profile.photos[0].value;
    const account = {
      displayName,
      provider,
      id,
      email,
      image,
      accessToken,
    };
    const verifiedAccount = await this.authService.OAuthValidate(account);
    done(null, verifiedAccount);
  }
}
