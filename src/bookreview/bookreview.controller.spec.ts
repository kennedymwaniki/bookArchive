import { Test, TestingModule } from '@nestjs/testing';
import { BookreviewController } from './bookreview.controller';
import { BookreviewService } from './bookreview.service';

describe('BookreviewController', () => {
  let controller: BookreviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookreviewController],
      providers: [BookreviewService],
    }).compile();

    controller = module.get<BookreviewController>(BookreviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
