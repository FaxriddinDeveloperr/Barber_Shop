import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterUserDti } from 'src/user/dto/register-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  @Post('signup ')
  register(@Body() registerUserDti: RegisterUserDti) {
    return this.adminService.register(registerUserDti);
  }

  @Post("signin ")
  login(@Param() loginUserDto:LoginUserDto){
    return this.adminService.login(loginUserDto)
  }

}
