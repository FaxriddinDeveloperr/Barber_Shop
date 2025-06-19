import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/rating.entity';
import { successRes } from 'src/utils/succesResponse';
import { ErrorHender } from 'src/utils/catchError';

@Injectable()
export class RatingService {

  constructor(
    @InjectRepository(RatingEntity) private repo: Repository<RatingEntity>
  ) { }

  async create(createRatingDto: CreateRatingDto) {
    try {
      const data = this.repo.create(createRatingDto);
      await this.repo.save(data);
      return successRes(data, 201);
    } catch (error) {
      return ErrorHender(error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find();
      if (!data.length) {
        throw new NotFoundException('Ratings not found');
      }
      return successRes(data, 200)
    } catch (error) {
      return ErrorHender(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.repo.findOne({ where: { id } })
      if(!data) {
        return ErrorHender(`Rating with id: ${id} not found`);
      }
      return successRes(data, 200);
    } catch (error) {
      return ErrorHender(error.message);
    }
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    try {
      const data = await this.repo.findOne({ where: {id} });
      if(!data) {
        return ErrorHender(`Rating with id: ${id} not found`);
      }
      await this.repo.update(id, updateRatingDto);
      const updatedData = await this.repo.findOne({ where: { id } });
      return successRes(updatedData, 200);
    } catch (error) {
      return ErrorHender(error.message);
    }
  }

  async remove(id: number) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        return ErrorHender(`Rating with id: ${id} not found`);
      }
      await this.repo.delete(id);
      return successRes({ message: 'Rating deleted successfully' }, 200);
    } catch (error) {
      return ErrorHender(error.message);  
    }
  }
}
