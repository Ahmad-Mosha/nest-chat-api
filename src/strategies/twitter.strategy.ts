import { Strategy } from 'passport-twitter';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
      includeEmail: true,
    });
  }

  async validate(token: string, tokenSecret: string, profile: any) {
    const { displayName, id, provider } = profile;
    const email = profile.emails[0].value;
    const image =
      profile.photos && profile.photos[0] ? profile.photos[0].value : null;
    const account = {
      displayName,
      provider,
      id,
      email,
      image,
      accessToken: token,
    };
    console.log(profile);
    await this.authService.OAuthValidate(account);
    return account;
  }
}
