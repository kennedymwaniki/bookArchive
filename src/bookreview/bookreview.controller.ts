import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookreviewService } from './bookreview.service';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';

@Controller('bookreview')
export class BookreviewController {
  constructor(private readonly bookreviewService: BookreviewService) {}

  @Post()
  create(@Body() createBookreviewDto: CreateBookreviewDto) {
    return this.bookreviewService.create(createBookreviewDto);
  }

  @Get()
  findAll() {
    return this.bookreviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookreviewService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookreviewDto: UpdateBookreviewDto,
  ) {
    return this.bookreviewService.update(id, updateBookreviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookreviewService.remove(id);
  }
}
