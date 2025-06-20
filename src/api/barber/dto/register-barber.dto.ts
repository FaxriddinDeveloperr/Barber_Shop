import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class RegisterBarberDto {
  @ApiProperty({ description: 'full name', example: 'Usmonqulov Abduhamid' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ description: 'phone number', example: '+998930451852' })
  @IsString()
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ description: 'password', example: '1234User#' })
  @IsString()
  @IsNotEmpty()
  @Length(5, 15, {
    message: `Parol uzunligi 5 dan 15 belgigacha bo'lishi kerak`,
  })
  password: string;

  @ApiProperty({ description: 'Email', example: 'karalevstvabitva@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'bio',
    example:
      '2 yildan ortiq tajribaga ega sartaroshman. Erkaklar soch turmaklari, soqol olish va styling xizmatlarini taklif qilaman. Toza va sifatli xizmat — mening ustuvorligim.',
  })
  @IsString()
  @Length(8, 300, { message: "bio uzunligi 8 dan 300 gacha bo'lishi kerak" })
  @IsNotEmpty()
  bio: string;

  @ApiProperty({ description: 'image link' })
  @IsOptional()
  @IsString()
  img: string;

  @ApiProperty({ example: 'barberShop_id' })
  @IsString()
  @IsNotEmpty()
  barberShop_id: string;
}
