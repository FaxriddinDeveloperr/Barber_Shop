import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceEntity } from './entities/service.entity';
import { ErrorHender } from 'src/utils/catchError';
import { successRes } from 'src/utils/succesResponse';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}
  async create(createServiceDto: CreateServiceDto): Promise<any> {
    try {
      const service = this.serviceRepository.create(createServiceDto);
      await this.serviceRepository.save(service);
      return successRes(service, 201);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findAll() {
    try {
      const data = await this.serviceRepository.find();
      return successRes(data);
    } catch (error) {
      ErrorHender(error);
    }
  }

  async findOne(id: string): Promise<ServiceEntity> {
    try {
      const service = await this.serviceRepository.findOne({ where: { id } });
      if (!service) {
        throw new NotFoundException(`Service with id ${id} not found`);
      }
      return service;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to fetch service',
        error.message,
      );
    }
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceEntity> {
    try {
      const service = await this.serviceRepository.preload({
        id,
        ...updateServiceDto,
      });
      if (!service) {
        throw new NotFoundException(`Service with id ${id} not found`);
      }
      return await this.serviceRepository.save(service);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const service = await this.findOne(id);
      await this.serviceRepository.remove(service);
    } catch (error) {
      return ErrorHender(error);
    }
  }
}
