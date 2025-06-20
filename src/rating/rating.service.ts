import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/rating.entity';
import { successRes } from 'src/utils/succesResponse';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private repo: Repository<RatingEntity>,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    try {
      const data = this.repo.create(createRatingDto);
      await this.repo.save(data);
      return successRes(data, 201);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find();
      if (!data.length) {
        throw new NotFoundException('Ratings not found');
      }
      return successRes(data, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Rating with id: ${id} not found`);
      }
      return successRes(data, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Rating with id: ${id} not found`);
      }

      const updatedData = this.repo.merge(data, updateRatingDto);
      await this.repo.save(updatedData);

      return successRes(updatedData, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Rating with id: ${id} not found`);
      }

      await this.repo.delete(id);
      return successRes({ message: 'Rating deleted successfully' }, 200);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
