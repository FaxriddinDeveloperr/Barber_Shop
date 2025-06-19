import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({example: '1'})
  @IsNotEmpty()
  @IsString()
  barber_id: string;

  @ApiProperty({example: '1'})
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ example: 'Meniga yoqdi' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  comment: string;
}
