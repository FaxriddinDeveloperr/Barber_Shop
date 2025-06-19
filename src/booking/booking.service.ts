import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { Repository } from 'typeorm';

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
      return { data };
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      const data = await this.Booking.find();
      if (!data.length) {
        throw new NotFoundException('Not fount data');
      }
      return { data };
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.Booking.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException('Not fount data by id');
      }
      return { data };
    } catch (error) {
      return error.message;
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
      return {newdata}
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: string) {
    try {
      const data = await this.Booking.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException('Not fount data by id');
      }
      const delet = await this.Booking.remove(data)
      return {delet} 
    } catch (error) {
      return error.message
    }
  }
}
