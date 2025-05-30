import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bookreview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  content: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  rating: number;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => User, (user) => user.bookReviews)
  reviewer: User;

  @ManyToOne(() => Book, (book) => book.bookReviews)
  @JoinTable()
  book: Book;
}
