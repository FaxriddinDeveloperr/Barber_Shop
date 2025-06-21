import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarberScheduleEntity } from 'src/core/entity/barber-schedule.entity';
import { CreateBarberScheduleDto } from './dto/create-barber-schedule.dto';
import { UpdateBarberScheduleDto } from './dto/update-barber-schedule.dto';
import { successRes } from 'src/infrostructure/utils/succesResponse';
import { ErrorHender } from 'src/infrostructure/utils/catchError';

@Injectable()
export class BarberScheduleService {
  constructor(
    @InjectRepository(BarberScheduleEntity)
    private readonly scheduleRepo: Repository<BarberScheduleEntity>,
  ) {}

  async create(dto: CreateBarberScheduleDto) {
    try {
      const schedule = this.scheduleRepo.create(dto);
      await this.scheduleRepo.save(schedule);
      return successRes(schedule, 201);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findAll() {
    try {
      const data = await this.scheduleRepo.find({ relations: ['barber'] });
      return successRes(data);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.scheduleRepo.findOne({
        where: { id },
        relations: ['barber'],
      });
      if (!data) throw new NotFoundException('Schedule not found');
      return successRes(data);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async update(id: string, dto: UpdateBarberScheduleDto) {
    try {
      const schedule = await this.scheduleRepo.findOneBy({ id });
      if (!schedule) throw new NotFoundException('Schedule not found');

      await this.scheduleRepo.update(id, dto);
      const updated = await this.scheduleRepo.findOne({ where: { id } });
      return successRes(updated);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async remove(id: string) {
    try {
      const schedule = await this.scheduleRepo.findOneBy({ id });
      if (!schedule) throw new NotFoundException('Schedule not found');

      await this.scheduleRepo.remove(schedule);
      return successRes({ message: 'Deleted successfully' });
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async getSchedulesByBarber(barberId: string) {
    try {
      const schedules = await this.scheduleRepo.find({
        where: { barber_id: barberId },
      });
      return successRes(schedules);
    } catch (error) {
      return ErrorHender(error);
    }
  }
}
