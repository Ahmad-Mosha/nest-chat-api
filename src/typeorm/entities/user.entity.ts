import { Column, Entity, ObjectIdColumn, ObjectId, Index } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  image?: string;

  @Column()
  password: string;
}
