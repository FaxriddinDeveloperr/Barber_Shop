import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
     @ApiProperty({ example: 'Usmonqulov Abduhamid' })
      @IsString()
      @IsNotEmpty()
      full_name: string;
    
      @ApiProperty({ example: '+998930451852' })
      @IsString()
      @IsNotEmpty()
      phone_number: string;
    
      @ApiProperty({ example: 'karalevstvabitva@gmail.com' })
      @IsString()
      @IsNotEmpty()
      @IsEmail()
      email: string;
    
}



<<<<<<< HEAD:src/user/dto/update-user.dto.ts
export enum Role  {
    SUPPER_ADMIN = "supper_admin",
    ADMIN = "admin",
    USER = "user",
}
=======
>>>>>>> main:src/api/user/dto/update-user.dto.ts
