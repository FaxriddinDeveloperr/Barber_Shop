import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  isDecimal,
  IsNotEmpty,
  IsNumber,
  isNumber,
  IsString,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 500.0 })
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @ApiProperty({ example: 'kelorasilar' })
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty({ example: 'JOXA' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 1300 })
  @IsNumber()
  @IsNotEmpty()
  duration_minutes: number;
  @ApiProperty({ example: '`' })
  @IsString()
  @IsNotEmpty()
  barberShop_Id: string;
}
