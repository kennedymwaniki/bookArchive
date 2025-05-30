import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find({
      relations: ['books'],
    });
  }
  //! this will be also be the same as the GET /categories/:id/books route
  async findOne(id: string) {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['books'],
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new BadRequestException(`Category with ID ${id} not found`);
    }
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestException(`Category with ID ${id} not found`);
    }
    await this.categoryRepository.remove(category);
    return { message: `Category with ID ${id} removed successfully` };
  }
}
