import { PassportSerializer } from '@nestjs/passport';

export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: Express.User, done: (err, user) => void) {
    return done(null, user);
  }

  async deserializeUser(user: Express.User, done: (err, user) => void) {
    return done(null, user);
  }
}
