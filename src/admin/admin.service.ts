import {
  ConflictException,
  ForbiddenException,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDti } from 'src/user/dto/register-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ErrorHender } from 'src/utils/catchError';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/user/dto/update-user.dto';
import { successRes } from 'src/utils/succesResponse';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    const full_name = process.env.SUPPER_ADMIN_FULL_NAME
    const phone_number = process.env.SUPPER_ADMIN_PHONE_NUMBER
    const email = String(process.env.SUPPER_ADMIN_EMAIL)
    const password = String(process.env.SUPPER_ADMIN_PASSWORD)

    try {
      let user = await this.userRepo.findOne({where: {email: email}})
    if(!user){
      let hashpass = bcrypt.hashSync(password, 10)
      const Supper_admin = this.userRepo.create({
        full_name,
        phone_number,
        email,
        password: hashpass,
        role: Role.SUPPER_ADMIN
      })
      await this.userRepo.save(Supper_admin)
      console.log("Supper_admin creted");
      
    }
    } catch (error) {
      console.log(error.message);
      
    }
  }

  async register(registerUserDti: RegisterUserDti) {
    try {
      const data = await this.userRepo.findOne({
        where: { email: registerUserDti.email },
      });
      if (data) {
        throw new ConflictException('Email olredy exists');
      }
      const hashpass = bcrypt.hashSync(registerUserDti.password, 10);
      let admin = {
        ...registerUserDti,
        password: hashpass,
        role: Role.ADMIN,
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
      if (!bcrypt.compareSync(loginUserDto.password, user.password)) {
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
 