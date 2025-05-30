import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(2)
  name: string;

  @IsString()
  @MaxLength(500)
  bio: string;

  @IsDateString()
  @IsOptional()
  birthDate: string;

  @IsInt()
  @IsNotEmpty()
  isActive: boolean;
}
