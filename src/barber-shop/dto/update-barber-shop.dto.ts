import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBarberShopDto } from './create-barber-shop.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBarberShopDto {
  @ApiProperty({ example: 'Faxa' })
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty({ example: 'Toshkent' })
  @IsString()
  @IsOptional()
  location: string;
  @ApiProperty({ example: 'img' })
  @IsString()
  @IsOptional()
  image: string;
  @ApiProperty({ example: 'eng yaxshisi bizda' })
  @IsString()
  @IsOptional()
  descripton: string;
}
