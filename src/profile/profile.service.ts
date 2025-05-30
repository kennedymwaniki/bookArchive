import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly userService: UserService,
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    const user = await this.userService.findOne(createProfileDto.userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const profile = this.profileRepository.create({
      ...createProfileDto,
      user: user,
    });
    return this.profileRepository.save(profile);
  }

  async findAll() {
    return this.profileRepository.find();
  }

  async findOne(id: string) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!profile) {
      throw new BadRequestException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!profile) {
      throw new BadRequestException(`Profile with ID ${id} not found`);
    }
    await this.profileRepository.update(id, updateProfileDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.profileRepository.delete(id);
  }
}
