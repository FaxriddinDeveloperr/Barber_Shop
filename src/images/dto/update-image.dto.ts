import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateImageDto } from './create-image.dto';
import { IsOptional, IsUUID, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdateImageDto extends PartialType(CreateImageDto) {
  @ApiProperty({ example: 'uuid-string', required: false })
  @IsOptional()
  @IsUUID()
  barber_shop_id?: string;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "URL of the image",
    required: false
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(500)
  img?: string;
}
