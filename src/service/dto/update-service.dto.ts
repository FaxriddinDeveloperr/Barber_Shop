import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
  @ApiProperty({ example: 500.0 })
  @IsDecimal()
  @IsOptional()
  price: number;
  @ApiProperty({ example: 'kelorasilar' })
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty({ example: 'JOXA' })
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty({ example: 1300 })
  @IsDecimal()
  @IsOptional()
  duration_minutes: number;
  @ApiProperty({ example: ' id' })
  @IsString()
  @IsOptional()
  barberShop_Id: string;
}
