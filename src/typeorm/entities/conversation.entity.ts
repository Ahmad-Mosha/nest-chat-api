/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { User } from './user.entity';
import { Account } from './account.entity';
import { Message } from './message.entity';
import { CreateDateColumn } from 'typeorm';

@Entity('conversations')
export class Conversation {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  creator: User | Account;

  @Column()
  recipient: User | Account;

  @Column({ array: true })
  messages: Message[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
