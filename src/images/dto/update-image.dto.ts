import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateImageDto } from './create-image.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {
        @ApiProperty({example: 1 })
        barber_shop_id: number;
    
        @ApiProperty({example: "https://example.com/image.jpg", description: "URL of the image"})
        img: string;
}
