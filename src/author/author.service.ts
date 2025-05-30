import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async findAll() {
    return await this.authorRepository.find({
      relations: ['books'],
    });
  }

  async findOne(id: string) {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new BadRequestException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new BadRequestException(`Author with ID ${id} not found`);
    }
    await this.authorRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new BadRequestException(`Author with ID ${id} not found`);
    }
    await this.authorRepository.remove(author);
    return {
      message: 'Author has been deleted',
    };
  }
}
