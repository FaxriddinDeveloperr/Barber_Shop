import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ErrorHender } from 'src/utils/catchError';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {

  constructor(
    @InjectRepository(ImageEntity) private repo: Repository<ImageEntity>
  ) { }

  async create(createImageDto: CreateImageDto) {
    try {
      const data = this.repo.create()
      await this.repo.save(data);
    } catch (error) {
      return ErrorHender(error.message)
    }
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
