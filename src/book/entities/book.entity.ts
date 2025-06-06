import { Author } from '../../author/entities/author.entity';
import { Bookreview } from '../../bookreview/entities/bookreview.entity';
import { Category } from '../../category/entities/category.entity';
import {
  Column,
  Entity,
  JoinTable,
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
  reviews: Bookreview[];

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
