import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsDateString()
  @IsOptional()
  dob: string;
}
