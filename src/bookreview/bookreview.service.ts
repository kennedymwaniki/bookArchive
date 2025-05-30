import { UserService } from 'src/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookService } from 'src/book/book.service';
import { Bookreview } from './entities/bookreview.entity';

@Injectable()
export class BookreviewService {
  constructor(
    @InjectRepository(Bookreview)
    private readonly bookreviewRepository: Repository<Bookreview>,
    private readonly bookService: BookService,
    private readonly userService: UserService,
  ) {}
  async create(createBookreviewDto: CreateBookreviewDto) {
    const book = await this.bookService.findOne(createBookreviewDto.bookId);
    if (!book) {
      throw new BadRequestException('Book not found');
    }

    const user = await this.userService.findOne(createBookreviewDto.userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    // Ensure the user is associated with the book review
    const bookreview = this.bookreviewRepository.create({
      ...createBookreviewDto,
      book: book,
      reviewer: user,
    });

    return this.bookreviewRepository.save(bookreview);
  }

  async findAll() {
    return await this.bookreviewRepository.find();
  }

  async findOne(id: string) {
    const bookreview = await this.bookreviewRepository.findOne({
      where: { id },
      relations: ['book'],
    });
    if (!bookreview) {
      throw new BadRequestException(`Bookreview with ID ${id} not found`);
    }
    return bookreview;
  }

  async update(id: string, updateBookreviewDto: UpdateBookreviewDto) {
    const bookreview = await this.bookreviewRepository.findOne({
      where: { id },
    });

    if (!bookreview) {
      throw new BadRequestException(`Bookreview with ID ${id} not found`);
    }
    await this.bookreviewRepository.update(id, updateBookreviewDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const bookreview = await this.findOne(id);
    if (!bookreview) {
      throw new BadRequestException(`Bookreview with ID ${id} not found`);
    }
    await this.bookreviewRepository.remove(bookreview);
    return { message: `Bookreview with ID ${id} removed successfully` };
  }
}

//! Bookreview Service
