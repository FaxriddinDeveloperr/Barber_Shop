import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/rating.entity';
import { successRes } from 'src/utils/succesResponse';
import { validate as isUUID } from 'uuid';

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
      this.handleError(error);
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
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      this.validateId(id);
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Rating with id: ${id} not found`);
      }
      return successRes(data, 200);
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    try {
      this.validateId(id);
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Rating with id: ${id} not found`);
      }
      const updatedData = this.repo.merge(data, updateRatingDto);
      await this.repo.save(updatedData);
      return successRes(updatedData, 200);
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      this.validateId(id);
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Rating with id: ${id} not found`);
      }
      await this.repo.delete(id);
      return successRes({ message: 'Rating deleted successfully' }, 200);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new InternalServerErrorException(error.message);
  }

  private validateId(id: string): void {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid UUID format for id: ${id}`);
    }
  }
}
