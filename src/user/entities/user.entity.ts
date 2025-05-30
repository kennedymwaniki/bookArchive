import { Bookreview } from 'src/bookreview/entities/bookreview.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Bookreview, (bookreview) => bookreview.reviewer)
  bookReviews: Bookreview[];
}
