import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDti } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerUserDti: RegisterUserDti) {
    return this.userService.register(registerUserDti);
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Patch(":id")
  update(@Param("id") id: string, @Body() data: UpdateUserDto){
    return this.userService.update(id, data)
  }

  @Delete(':id')
  delet(@Param('id') id: string) {
    return this.userService.delet(id);
  }
}
