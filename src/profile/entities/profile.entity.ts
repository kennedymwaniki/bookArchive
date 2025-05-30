import { User } from '../../user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  bio?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  profileImage?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  dob: string;

  @Column({
    type: 'varchar',
  })
  location: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
