import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  @InjectRepository(Book)
  private readonly bookRepository: Repository<Book>;

  create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find({
      relations: ['author', 'reviews', 'categories'],
    });
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'reviews'],
    });
    if (!book) {
      throw new Error(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new Error(`Book with ID ${id} not found`);
    }
    await this.bookRepository.update(id, updateBookDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    if (!book) {
      throw new Error(`Book with ID ${id} not found`);
    }
    await this.bookRepository.remove(book);
    return {
      message: 'Book has been deleted',
    };
  }

  async search(filters: {
    title?: string;
    author?: string;
    category?: string;
  }) {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');

    if (filters.title) {
      queryBuilder.andWhere('book.title LIKE :title', {
        title: `%${filters.title}%`,
      });
    }

    if (filters.author) {
      queryBuilder
        .leftJoinAndSelect('book.author', 'author')
        .andWhere('author.name LIKE :author', {
          author: `%${filters.author}%`,
        });
    }

    if (filters.category) {
      queryBuilder
        .leftJoinAndSelect('book.category', 'category')
        .andWhere('category.name LIKE :category', {
          category: `%${filters.category}%`,
        });
    }

    return await queryBuilder.getMany();
  }
}
