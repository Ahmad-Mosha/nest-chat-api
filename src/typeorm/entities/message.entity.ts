import {
  Column,
  Entity,
  ObjectIdColumn,
  ObjectId,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Account } from './account.entity';

@Entity('messages')
export class Message {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'string' })
  content: string;

  @Column('jsonb')
  author: User | Account;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
