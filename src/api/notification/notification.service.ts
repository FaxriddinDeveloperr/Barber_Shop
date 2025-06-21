import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from 'src/core/entity/notification.entity';
import { Repository } from 'typeorm';
import { successRes } from 'src/infrostructure/utils/succesResponse';
import { ErrorHender } from 'src/infrostructure/utils/catchError';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notifRepo: Repository<NotificationEntity>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const notification = this.notifRepo.create({ ...createNotificationDto });
      await this.notifRepo.save(notification);
      return successRes(notification, 201)
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findAll() {
    try {
      const notifications = await this.notifRepo.find();
      return successRes(notifications)
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async findOne(id: string) {
    try {
      const notification = await this.notifRepo.findOne({ where: { id } });
      if (!notification) {
        throw new NotFoundException('Notification id not found');
      }
      return successRes(notification)
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    try {
      const notification = await this.notifRepo.findOne({ where: { id } });
      if (!notification) {
        throw new NotFoundException('Notification id not found');
      }
      const updateNotif = await this.notifRepo.update(
        { id },
        { ...updateNotificationDto },
      );
      return successRes(updateNotif);
    } catch (error) {
      return ErrorHender(error);
    }
  }

  async remove(id: string) {
    try {
      const notification = await this.notifRepo.findOne({ where: { id } });
      if (!notification) {
        throw new NotFoundException('Notification id not found');
      }

      await this.notifRepo.delete(id);
      return successRes(notification)
    } catch (error) {
      return ErrorHender(error);
    }
  }
}
