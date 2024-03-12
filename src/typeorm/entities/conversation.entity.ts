/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { User } from './user.entity';
import { Account } from './account.entity';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ array: true })
  participants: (User | Account)[];

  @Column((type) => Message, { array: true })
  messages: Message[];
}
