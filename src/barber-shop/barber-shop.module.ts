import { Module } from '@nestjs/common';
import { BarberShopService } from './barber-shop.service';
import { BarberShopController } from './barber-shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberShopEntity } from './entities/barber-shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BarberShopEntity])],
  controllers: [BarberShopController],
  providers: [BarberShopService],
})
export class BarberShopModule {}
BarberShopModule