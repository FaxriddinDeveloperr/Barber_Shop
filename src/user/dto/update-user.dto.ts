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
    
      @ApiProperty({ example: 'usmonqulovabduhamid00@gmail.com' })
      @IsString()
      @IsNotEmpty()
      @IsEmail()
      email: string;
    
}



export enum Role  {
    ADMIN = "admin",
    USER = "user",
}