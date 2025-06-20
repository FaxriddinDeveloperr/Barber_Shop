import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDti } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorHender } from 'src/infrostructure/utils/catchError';
import { successRes } from 'src/infrostructure/utils/succesResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly User: Repository<UserEntity>,
    private readonly jwtSerwis: JwtService,
  ) {}

  async register(registerUserDti: RegisterUserDti) {
    try {
      const data = await this.User.findOne({
        where: { email: registerUserDti.email },
      });
      if (data) {
        throw new ConflictException('Email alredy exists');
      }
      const hashPass = bcrypt.hashSync(registerUserDti.password, 10);

      let user = {
        ...registerUserDti,
        password: hashPass,
      };
      const user2 = this.User.create(user);
      await this.User.save(user2);
      return successRes(user2, 201);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const data = await this.User.findOne({
        where: { email: loginUserDto.email },
      });
      if (!data) {
        throw new ForbiddenException('Wrong email');
      }
      if (!bcrypt.compareSync(loginUserDto.password, data.password)) {
        throw new ForbiddenException('Wrong password');
      }
      const acsesToken = this.AcsesToken({ id: data.id, email: data.email });

      const refreshToken = this.RefreshToken({
        id: data.id,
        email: data.email,
      });
      return { acsesToken, refreshToken };
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findAll() {
    try {
      const data = await this.User.find({
        select: ['full_name', 'email', 'phone_number', 'role', 'id'],
      });
      if (!data.length) {
        throw new NotFoundException('Not fount user');
      }
      return successRes(data)
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.User.findOne({
        where: { id },
        select: ['full_name', 'email', 'phone_number', 'role', 'id'],
      });
      if (!data) {
        throw new NotFoundException('Not fount user');
      }
      return successRes(data)
    } catch (error) {
      return ErrorHender(error);
    }
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data = await this.User.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException('Not fount user by id');
      }
      await this.User.update(id, updateUserDto);
      const newdata = await this.User.findOne({
        where: { id },
        select: ['full_name', 'email', 'phone_number', 'role', 'id'],
      });
      return successRes(newdata);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async delet(id: string) {
    try {
      let data = await this.User.findOneBy({ id });
      if (!data) {
        throw new NotFoundException('Not fount user');
      }
      let delet = await this.User.remove(data);
      return successRes(delet)
    } catch (error) {
      ErrorHender(error);
    }
  }

  AcsesToken(pelod: { id: string; email: string }) {
    return this.jwtSerwis.sign(pelod, {
      secret: String(process.env.ACSES_SECRET),
      expiresIn: '1d',
    });
  }
  RefreshToken(pelod: { id: string; email: string }) {
    return this.jwtSerwis.sign(pelod, {
      secret: String(process.env.REFRESG_SEKRET),
      expiresIn: '7d',
    });
  }
}
