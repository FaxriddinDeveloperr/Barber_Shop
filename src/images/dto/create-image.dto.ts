import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateImageDto {
    @ApiProperty({example: 1 })
    @IsNotEmpty()
    barber_shop_id: string;

    @ApiProperty({example: "https://example.com/image.jpg", description: "URL of the image"})
    @IsNotEmpty()
    img: string;
}
