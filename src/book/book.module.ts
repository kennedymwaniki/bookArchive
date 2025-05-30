import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Module({
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
  imports: [TypeOrmModule.forFeature([Book])], // Add your Book entity here
})
export class BookModule {}
