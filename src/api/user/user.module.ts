import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    global: true
  })
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
