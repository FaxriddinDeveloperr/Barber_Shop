import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from '../../core/entity/booking.entity';
import { Repository } from 'typeorm';
import { ErrorHender } from 'src/infrostructure/utils/catchError';
import { successRes } from 'src/infrostructure/utils/succesResponse';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly Booking: Repository<BookingEntity>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    try {
      const data = this.Booking.create(createBookingDto);
      await this.Booking.save(data);
      return successRes(data, 201)
    } catch (error) {
      return ErrorHender(error)
    }
  }

  async findAll() {
    try {
      const data = await this.Booking.find();
      if (!data.length) {
        throw new NotFoundException('Not fount data');
      }
      return successRes(data);
    } catch (error) {
      return ErrorHender(error)
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.Booking.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException('Not fount data by id');
      }
      return successRes(data)
    } catch (error) {
      return ErrorHender(error)
    }
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    try {
      const data = await this.Booking.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException('Not fount data by id');
      }
      await this.Booking.update(id, updateBookingDto);
      const newdata = await this.Booking.findOne({ where: { id } });
      return successRes(newdata)
    } catch (error) {
      return ErrorHender(error)
    }
  }

  async remove(id: string) {
    try {
      const data = await this.Booking.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException('Not fount data by id');
      }
      const delet = await this.Booking.remove(data)
      return successRes(delet)
    } catch (error) {
      return ErrorHender(error)
    }
  }
}
