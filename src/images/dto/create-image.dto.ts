import { ApiProperty } from "@nestjs/swagger";

export class CreateImageDto {
    @ApiProperty({example: 1 })
    barber_shop_id: number;

    @ApiProperty({example: "https://example.com/image.jpg", description: "URL of the image"})
    img: string;
}
