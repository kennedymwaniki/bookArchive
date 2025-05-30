import { Author } from 'src/author/entities/author.entity';
import { Bookreview } from 'src/bookreview/entities/bookreview.entity';
import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'date',
  })
  publicationYear: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isAvailable: boolean;

  @OneToMany(() => Bookreview, (bookreview) => bookreview.book)
  bookReviews: Bookreview[];

  @ManyToMany(() => Category, (category) => category.books)
  categories: Category[];

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
