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
              recipient: {
                name: conversation.recipient.name,
                email: conversation.recipient.email,
                image: conversation.recipient.image,
              },
              messages,
              created_at,
            };
          }
          if (conversation.recipient.email === user.email) {
            return {
              _id,
              recipient: {
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
