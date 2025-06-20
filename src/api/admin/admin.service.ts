import {
  ConflictException,
  ForbiddenException,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/core/entity/user.entity';
import { UserService } from '../user/user.service';
import { UserRole } from 'src/common/enum';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { successRes } from 'src/infrostructure/utils/succesResponse';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ErrorHender } from 'src/infrostructure/utils/catchError';
import { BcryptEncryption } from 'src/infrostructure/bcrypt';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly Bcrypt: BcryptEncryption,
  ) {}

  async onModuleInit() {
    const full_name = process.env.SUPPER_ADMIN_FULL_NAME;
    const phone_number = process.env.SUPPER_ADMIN_PHONE_NUMBER;
    const email = String(process.env.SUPPER_ADMIN_EMAIL);
    const password = String(process.env.SUPPER_ADMIN_PASSWORD);

    try {
      let user = await this.userRepo.findOne({ where: { email: email } });
      if (!user) {
        let hashpass = await this.Bcrypt.Generate(password);

        const Supper_admin = this.userRepo.create({
          full_name,
          phone_number,
          email,
          password: hashpass,
          role: UserRole.SUPPER_ADMIN,
        });
        await this.userRepo.save(Supper_admin);
        console.log('Supper_admin creted');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async register(registerUserDti: RegisterUserDto) {
    try {
      const data = await this.userRepo.findOne({
        where: { email: registerUserDti.email },
      });
      if (data) {
        throw new ConflictException('Email olredy exists');
      }
      const hashpass = await this.Bcrypt.Generate(registerUserDti.password);
      let admin = {
        ...registerUserDti,
        password: hashpass,
        role: UserRole.ADMIN,
      };
      const Admins = this.userRepo.create(admin);
      await this.userRepo.save(Admins);
      successRes(Admins, 201);
    } catch (error) {
      return ErrorHender(error);
    }
  }
  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userRepo.findOne({
        where: { email: loginUserDto.email },
      });
      if (!user) {
        throw new ForbiddenException('Wrong email');
      }
      if (!(await this.Bcrypt.Verify(loginUserDto.password, user.password))) {
        throw new ForbiddenException('Wrong password');
      }
      const acsesToken = this.userService.AcsesToken({
        id: user.id,
        role: user.role,
      });
      const refreshToken = this.userService.RefreshToken({
        id: user.id,
        role: user.role,
      });
      return { acsesToken, refreshToken };
    } catch (error) {
      return ErrorHender(error);
    }
  }
}
