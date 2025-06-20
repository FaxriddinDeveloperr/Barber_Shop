import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BarberService } from './barber.service';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { RegisterBarberDto } from './dto/register-barber.dto';
import { LoginBarberDto } from './dto/login-barber.dto';
import { OtpBarberDto } from './dto/Otp-barber.dto';

@Controller('barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Post('Signup')
  register(@Body() registerBarberDto: RegisterBarberDto) {
    return this.barberService.register(registerBarberDto);
  }

  @Post('Signin')
  login(@Body() loginBarberDto: LoginBarberDto) {
    return this.barberService.login(loginBarberDto);
  }
  @Post("verify_otp")
  verify_otp(@Body() data: OtpBarberDto){
    return this.barberService.VarifyOtp(data)
  }

  @Get('all')
  findAll() {
    return this.barberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barberService.findOne(id);
  }

  @Patch('update:id')
  update(@Param('id') id: string, @Body() updateBarberDto: UpdateBarberDto) {
    return this.barberService.update(id, updateBarberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barberService.remove(id);
  }

}
