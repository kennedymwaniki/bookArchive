import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBookreviewDto {
  @IsString()
  @MaxLength(1000)
  @MinLength(10)
  content: string;

  @IsInt()
  @MinLength(1)
  @MaxLength(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  bookId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
