import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'text',
  })
  bio?: string;

  @Column({
    type: 'string',
    nullable: true,
  })
  avatar?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  dob: string;

  @Column({
    type: 'string',
  })
  location: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
