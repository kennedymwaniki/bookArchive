import { Test, TestingModule } from '@nestjs/testing';
import { BookreviewService } from './bookreview.service';

describe('BookreviewService', () => {
  let service: BookreviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookreviewService],
    }).compile();

    service = module.get<BookreviewService>(BookreviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
