import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('accounts')
export class Account {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  image: string;

  @Column()
  provider: string;

  @Column()
  id: string;

  @Column()
  accessToken: string;
}
