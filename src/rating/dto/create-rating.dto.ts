import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ example: 'uuid-string' })
  @IsNotEmpty()
  @IsUUID()
  barber_id: string;

  @ApiProperty({ example: 'uuid-string' })
  @IsNotEmpty()
  @IsUUID() 
  userId: string;

  @ApiProperty({ example: 'Meniga yoqdi' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  comment: string;
}
