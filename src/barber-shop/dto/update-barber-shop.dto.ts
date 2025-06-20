import { ApiProperty, PartialType } from '@nestjs/swagger';
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
