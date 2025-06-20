import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBarberShopDto {
  @ApiProperty({ example: 'Faxa' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'Toshkent' })
  @IsString()
  @IsNotEmpty()
  location: string;
  @ApiProperty({ example: 'img' })
  @IsString()
  @IsNotEmpty()
  image: string;
  @ApiProperty({ example: 'eng yaxshisi bizda' })
  @IsString()
  @IsNotEmpty()
  descripton: string;
  @ApiProperty({ example: '+99877777777' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'qwert12345' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
