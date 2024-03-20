import {
  Column,
  Entity,
  ObjectIdColumn,
  ObjectId,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Account } from './account.entity';
import { RequestStatus } from 'src/utils/types';

@Entity('chat-invitaions')
export class ChatInvitation {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  sender: User | Account;

  @Column()
  receiver: User | Account;

  @Column({ default: RequestStatus.pending })
  status: RequestStatus = RequestStatus.pending;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
