import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { IsString } from 'class-validator';

export class UpdateBookingDto {
    @ApiProperty({example: "confirmend  |  concelet"})
    @IsString()
    status: Status.CONFIRMEND | Status.CONCELET
}



export enum Status {
  PENDING = 'pending',
  CONFIRMEND = 'confirmend',
  CONCELET = 'concelet',
}
