import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Account } from 'src/typeorm/entities/account.entity';
import { User } from 'src/typeorm/entities/user.entity';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: User | Account = request.user;
    const getId = user._id;
    const _id = new ObjectId(getId);
    console.log(user);
    return { ...user, _id };
  },
);
