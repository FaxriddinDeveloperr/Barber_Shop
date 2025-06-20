import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateImageDto } from './create-image.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateImageDto extends PartialType(CreateImageDto) {
        @ApiProperty({example: 1 })
        @IsString()
        @IsNotEmpty()
        barber_shop_id: string;
    
        @ApiProperty({example: "https://example.com/image.jpg", description: "URL of the image"})
        @IsNotEmpty()
        img: string;
}
