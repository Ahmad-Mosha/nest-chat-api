import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Account, Conversation, User } from 'src/typeorm';

@Injectable()
export class ConversationsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<Conversation[]>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user: User | Account = request.user;

    return next.handle().pipe(
      map((conversations) => {
        return conversations.map((conversation) => {
          const { _id, messages, created_at } = conversation;
          if (conversation.creator.email === user.email) {
            return {
              _id,
              recipent: {
                name: conversation.recipent.name,
                email: conversation.recipent.email,
                image: conversation.recipent.image,
              },
              messages,
              created_at,
            };
          }
          if (conversation.recipent.email === user.email) {
            return {
              _id,
              recipent: {
                name: conversation.creator.name,
                email: conversation.creator.email,
                image: conversation.creator.image,
              },
              messages,
              created_at,
            };
          }
        });
      }),
    );
  }
}
