import { Book } from 'src/book/entities/book.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Book, (book) => book.categories, {
    cascade: true,
    eager: true,
  })
  books: Book[];
}
