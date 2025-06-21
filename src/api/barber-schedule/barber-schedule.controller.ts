import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { BarberScheduleService } from './barber-schedule.service';
import { CreateBarberScheduleDto } from './dto/create-barber-schedule.dto';
import { UpdateBarberScheduleDto } from './dto/update-barber-schedule.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum/index';

@ApiTags('Barber Schedule')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('barber-schedules')
export class BarberScheduleController {
  constructor(private readonly scheduleService: BarberScheduleService) {}

  @Post()
  @Roles(Role.BARBER, Role.ADMIN)
  @ApiOperation({ summary: 'Yangi jadval yaratish (Barber yoki Admin)' })
  create(@Body() dto: CreateBarberScheduleDto) {
    return this.scheduleService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Barcha jadvallarni korish (Admin)' })
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.BARBER)
  @ApiOperation({ summary: 'Jadvalni ID orqali olish' })
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.BARBER, Role.ADMIN)
  @ApiOperation({ summary: 'Jadvalni yangilash (Barber yoki Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateBarberScheduleDto) {
    return this.scheduleService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Jadvalni ochirish (Faqat Admin)' })
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }

  @Get('my-schedules')
  @Roles(Role.BARBER)
  @ApiOperation({ summary: "O'zining jadvalini olish (Barber)" })
  getMySchedules(@Req() req: any) {
    return this.scheduleService.getSchedulesByBarber(req.user.id);
  }
}
