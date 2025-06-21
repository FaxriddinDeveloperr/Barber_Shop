import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReytingService } from './reyting.service';
import { CreateReytingDto } from './dto/create-reyting.dto';
import { UpdateReytingDto } from './dto/update-reyting.dto';

@Controller('reyting')
export class ReytingController {
  constructor(private readonly reytingService: ReytingService) {}

  @Post()
  create(@Body() createReytingDto: CreateReytingDto) {
    return this.reytingService.create(createReytingDto);
  }

  @Get()
  findAll() {
    return this.reytingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reytingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReytingDto: UpdateReytingDto) {
    return this.reytingService.update(id, updateReytingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reytingService.remove(id);
  }
}
