import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entity/user.entity';

@Module({
  imports :[UserModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
