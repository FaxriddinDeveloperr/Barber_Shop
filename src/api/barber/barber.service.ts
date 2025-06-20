import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { RegisterBarberDto } from './dto/register-barber.dto';
import { LoginBarberDto } from './dto/login-barber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberEntity } from 'src/core/entity/barber.entity';
import { Repository } from 'typeorm';
import { BcryptEncryption } from 'src/infrostructure/bcrypt';
import { successRes } from 'src/infrostructure/utils/succesResponse';
import { ErrorHender } from 'src/infrostructure/utils/catchError';
import { UserService } from '../user/user.service';
import { OtpBarberDto } from './dto/Otp-barber.dto';
import { OtpGenerate } from 'src/infrostructure/otp_generet/otp_generate';
import { MailModule } from 'src/common/mail/mail.module';
import { MailService } from 'src/common/mail/mail.service';

@Injectable()
export class BarberService {
  constructor(
    @InjectRepository(BarberEntity)
    private readonly BarberRepo: Repository<BarberEntity>,
    private readonly Bcrypt: BcryptEncryption,
    private readonly UserRepo: UserService,
    private readonly Otp: OtpGenerate,
    private readonly Mail: MailService,
  ) {}

  async register(registerBarberDto: RegisterBarberDto) {
    try {
      const data = await this.BarberRepo.findOne({
        where: { email: registerBarberDto.email },
      });
      if (data) {
        throw new ConflictException('Barber email alredy exists');
      }
      const hashPass = await this.Bcrypt.Generate(registerBarberDto.password);
      let newBarber = {
        ...registerBarberDto,
        password: hashPass,
      };
      const Barber = this.BarberRepo.create(newBarber);
      await this.BarberRepo.save(Barber);
      return successRes(Barber, 201);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async login(loginBarberDto: LoginBarberDto) {
    try {
      const data = await this.BarberRepo.findOne({
        where: { email: loginBarberDto.email },
      });
      if (!data) {
        throw new ForbiddenException('Wrong email');
      }
      if (!(await this.Bcrypt.Verify(loginBarberDto.password, data.password))) {
        throw new ForbiddenException('Wrong password');
      }
      let otp = this.Otp.Generate(String(data.email))
      await this.Mail.sendMail(data.email, "Sizning otp ko'tingiz",``)
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findAll() {
    try {
      const data = await this.BarberRepo.find({
        select: [
          'full_name',
          'email',
          'img',
          'phone_number',
          'bio',
          'id',
          'is_avaylbl',
          'avg_reyting',
          'barberShop_id',
        ],
      });
      if (!data.length) {
        throw new NotFoundException('Not Fount barber');
      }
      return successRes(data);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.BarberRepo.findOne({
        where: { id },
        select: [
          'full_name',
          'email',
          'img',
          'phone_number',
          'bio',
          'id',
          'is_avaylbl',
          'avg_reyting',
          'barberShop_id',
        ],
      });
      if (!data) {
        throw new NotFoundException('Not Fount barber');
      }
      return successRes(data);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async update(id: string, updateBarberDto: UpdateBarberDto) {
    try {
      const data = await this.BarberRepo.findOneBy({ id });
      if (!data) {
        throw new NotFoundException('Not Fount barber');
      }
      await this.BarberRepo.update(id, updateBarberDto);
      let newBarber = await this.BarberRepo.findOne({
        where: { id },
        select: [
          'full_name',
          'email',
          'img',
          'phone_number',
          'bio',
          'id',
          'is_avaylbl',
          'avg_reyting',
          'barberShop_id',
        ],
      });

      return successRes(newBarber);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.BarberRepo.findOneBy({ id });
      if (!data) {
        throw new NotFoundException('Not Fount barber');
      }
      let deleted = await this.BarberRepo.remove(data);
      return successRes(deleted);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async VarifyOtp(data: OtpBarberDto){

  }
}
