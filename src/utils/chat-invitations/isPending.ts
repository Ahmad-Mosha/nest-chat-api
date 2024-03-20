import { Account } from 'src/typeorm/entities/account.entity';
import { MongoRepository } from 'typeorm';
import { ChatInvitation } from 'src/typeorm/entities/chat-invitation';
import { User } from 'src/typeorm/entities/user.entity';
import { BadRequestException } from '@nestjs/common';

export async function isPending(
  sender: User | Account,
  receiver: User | Account,
  conversationRequest: MongoRepository<ChatInvitation>,
) {
  const dbRequest = await conversationRequest.findOne({
    where: {
      $or: [
        { sender, receiver },
        { receiver: sender, sender: receiver },
      ],
    },
  });
  if (dbRequest) {
    if (dbRequest.receiver.email === receiver.email) {
      throw new BadRequestException(
        'You already have sent a request for that user',
      );
    }

    if (dbRequest.sender.email === receiver.email) {
      throw new BadRequestException(
        'That user is already requesting a conversation with you',
      );
    }
  }
}
