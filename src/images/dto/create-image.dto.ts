import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateImageDto {
  @ApiProperty({ example: 'uuid-string' })
  @IsNotEmpty()
  @IsUUID()
  barber_shop_id: string;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "URL of the image",
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MaxLength(500)
  img: string;
}
