import { User } from 'src/typeorm/entities/user.entity';
import { Account } from 'src/typeorm/entities/account.entity';
import { MongoRepository } from 'typeorm';
import { Conversation } from 'src/typeorm/entities/conversation.entity';
export async function doesExist(
  authUser: User | Account,
  rec: any,
  conversationRepo: MongoRepository<Conversation>,
) {
  console.log(authUser);
  console.log(rec);
  const conversation = await conversationRepo.findOne({
    where: {
      $or: [
        { creator: authUser, recipent: rec },
        { creator: rec, recipent: authUser },
      ],
    },
  });
  console.log(conversation);
  return conversation;
}
