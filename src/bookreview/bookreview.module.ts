import { BookModule } from './../book/book.module';
import { Module } from '@nestjs/common';
import { BookreviewService } from './bookreview.service';
import { BookreviewController } from './bookreview.controller';

import { Bookreview } from './entities/bookreview.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [BookreviewController],
  providers: [BookreviewService],
  exports: [BookreviewService],
  imports: [BookModule, UserModule, TypeOrmModule.forFeature([Bookreview])],
})
export class BookreviewModule {}
