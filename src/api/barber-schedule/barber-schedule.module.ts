import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberScheduleEntity } from 'src/core/entity/barber-schedule.entity';
import { BarberEntity } from 'src/core/entity/barber.entity';
import { BarberScheduleService } from './barber-schedule.service';
import { BarberScheduleController } from './barber-schedule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BarberScheduleEntity, BarberEntity])],
  controllers: [BarberScheduleController],
  providers: [BarberScheduleService],
})
export class BarberScheduleModule {}
