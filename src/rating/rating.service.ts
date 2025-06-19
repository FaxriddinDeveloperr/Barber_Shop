import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/rating.entity';

@Injectable()
export class RatingService {

  constructor(
    @InjectRepository(RatingEntity) private repo: Repository<RatingEntity>
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    try {
      const data = this.repo.create(createRatingDto);
      await this.repo.save(data);
      return {
        statusCode: 201,
        message: 'success',
        data: data
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find();
      if(!data.length) {
        throw new NotFoundException('Ratings not found');
      }
      return {
        statusCode: 200,
        message: 'success',
        data: data
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
