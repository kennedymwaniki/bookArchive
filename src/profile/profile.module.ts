import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
  imports: [UserModule, TypeOrmModule.forFeature([Profile])],
})
export class ProfileModule {}
