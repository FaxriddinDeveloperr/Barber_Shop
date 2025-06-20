import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateRatingDto } from './create-rating.dto';
import { IsOptional, IsUUID, IsString, MaxLength } from 'class-validator';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {
  @ApiProperty({ example: 'uuid-string', required: false })
  @IsOptional()
  @IsUUID()
  barber_id?: string;

  @ApiProperty({ example: 'uuid-string', required: false })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ example: 'Meniga yoqdi', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;
}
