/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ObjectIdColumn, ObjectId, Index } from 'typeorm';
import { User } from './user.entity';
import { Account } from './account.entity';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('jsonb')
  participants: (User | Account)[];

  @Column((type) => Message)
  messages: Message[];
}
