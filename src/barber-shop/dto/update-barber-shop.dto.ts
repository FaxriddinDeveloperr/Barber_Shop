import { PartialType } from '@nestjs/swagger';
import { CreateBarberShopDto } from './create-barber-shop.dto';

export class UpdateBarberShopDto extends PartialType(CreateBarberShopDto) {}
