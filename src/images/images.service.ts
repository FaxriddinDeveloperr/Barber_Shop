import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { Repository } from 'typeorm';
import { successRes } from 'src/utils/succesResponse';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private repo: Repository<ImageEntity>,
  ) {}

  async create(createImageDto: CreateImageDto) {
    try {
      const data = this.repo.create(createImageDto);
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
        throw new NotFoundException('Images not found');
      }
      return successRes(data, 200);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Image with id: ${id} not found`);
      }
      return successRes(data, 200);
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Image with id: ${id} not found`);
      }
      const updatedData = this.repo.merge(data, updateImageDto);
      await this.repo.save(updatedData);
      return successRes(updatedData, 200);
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Image with id: ${id} not found`);
      }
      await this.repo.delete(id);
      return successRes(
        { message: `Image with id: ${id} successfully deleted` },
        200,
      );
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
}
