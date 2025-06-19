import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBarberShopDto } from './dto/create-barber-shop.dto';
import { UpdateBarberShopDto } from './dto/update-barber-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BarberShopEntity } from './entities/barber-shop.entity';
import { Repository } from 'typeorm';
import { ErrorHender } from 'src/utils/catchError';
import { successRes } from 'src/utils/succesResponse';
import { error } from 'console';

@Injectable()
export class BarberShopService {
  constructor(
    @InjectRepository(BarberShopEntity)
    private barberRepo: Repository<BarberShopEntity>,
  ) {}
  async create(createBarberShopDto: CreateBarberShopDto) {
    try {
      const existsName = await this.barberRepo.findOne({
        where: { name: createBarberShopDto.name },
      });
      if (existsName) {
        throw new ConflictException('name address alordy exists');
      }
      const data = await this.barberRepo.create(createBarberShopDto);
      await this.barberRepo.save(data);
      return successRes(data, 201);
    } catch (error) {
      ErrorHender(error);
    }
  }

  async findAll() {
    try {
      return await this.barberRepo.find();
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.barberRepo.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(error);
      }
      return successRes(data);
    } catch (error) {
      ErrorHender(error);
    }
  }

  async update(id: string, updateBarberShopDto: UpdateBarberShopDto) {
    try {
      const data = await this.barberRepo.findOne({ where: { id } });
      if (!data) {
        throw new InternalServerErrorException(error);
      }
      await this.barberRepo.update({ id }, updateBarberShopDto);
      const updateData = await this.barberRepo.findOne({ where: { id } });
      return successRes(updateData);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.barberRepo.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(error);
      }
      await this.barberRepo.delete(id);
      return successRes({});
    } catch (error) {
      ErrorHender(error);
    }
  }
}
