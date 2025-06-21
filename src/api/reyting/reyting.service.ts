import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReytingDto } from './dto/create-reyting.dto';
import { UpdateReytingDto } from './dto/update-reyting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReytingEntity } from '../../core/entity/reyting.entity';
import { Repository } from 'typeorm';
import { ErrorHender } from 'src/infrostructure/utils/catchError';
import { successRes } from 'src/infrostructure/utils/succesResponse';

@Injectable()
export class ReytingService {
  constructor(
    @InjectRepository(ReytingEntity)
    private reytingRepo: Repository<ReytingEntity>,
  ) {}

  async create(createReytingDto: CreateReytingDto) {
    try {
      const reyting = this.reytingRepo.create({ ...createReytingDto });
      await this.reytingRepo.save(reyting);
      return successRes(reyting, 201);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findAll() {
    try {
      const reytings = await this.reytingRepo.find();
      return reytings;
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findOne(id: string) {
    try {
      const reyting = await this.reytingRepo.findOne({ where: { id } });
      if (!reyting) {
        throw new NotFoundException('Reyting id not found');
      }

      return successRes(reyting);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async update(id: string, updateReytingDto: UpdateReytingDto) {
    try {
      const reyting = await this.reytingRepo.findOne({ where: { id } });
      if (!reyting) {
        throw new NotFoundException('Reyting id not found');
      }
      const updateReyting = await this.reytingRepo.update(
        { id },
        { ...updateReytingDto },
      );
      return successRes(updateReyting);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async remove(id: string) {
    try {
      const reyting = await this.reytingRepo.findOne({ where: { id } });
      if (!reyting) {
        throw new NotFoundException('Reyting id not found');
      }

      await this.reytingRepo.delete(id);
      return successRes({ data: {} });
    } catch (error) {
      return ErrorHender(error);
    }
  }
}
