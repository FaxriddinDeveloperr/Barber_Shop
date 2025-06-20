import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ErrorHender } from 'src/utils/catchError';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { Repository } from 'typeorm';
import { successRes } from 'src/utils/succesResponse';

@Injectable()
export class ImagesService {

  constructor(
    @InjectRepository(ImageEntity) private repo: Repository<ImageEntity>
  ) { }

  async create(createImageDto: CreateImageDto) {
    try {
      const data = this.repo.create(createImageDto);
      await this.repo.save(data);
      return successRes(data, 500)
    } catch (error) {
      return ErrorHender(error.message)
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find();
      if (!data.length) {
        return ErrorHender('Images not found');
      }
      return successRes(data, 200);
    } catch (error) {
      return ErrorHender(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        return ErrorHender(`Image with id: ${id} not found`);
      }
      return successRes(data, 200);
    } catch (error) {
      return ErrorHender(error.message);
    }
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    try {
      const data = await this.repo.findOne({ where: { id } });
      if (!data) {
        return ErrorHender(`Image with id: ${id} not found`);
      }
      await this.repo.update(id, updateImageDto);
      const updatedData = this.repo.findOne({ where: { id } });
      return successRes(updatedData, 200);
    } catch (error) {
      return ErrorHender(error.message);
    }
  }

  async remove(id: string) {
    const data = await this.repo.findOne({ where: { id } });
    if(!data) {
      return ErrorHender(`Image with id: ${id} not found`);
    }
    await this.repo.delete(id);
    return successRes({ message: `Image with id: ${id} successfuly deleted`}, 200);
  }
}
