// src/time-sheet/time-sheet.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { TimeSheetService } from './time-sheet.service';
import { CreateTimeSheetDto } from './dto/create-time-sheet.dto';

@Controller('time-sheet')
export class TimeSheetController {
  constructor(private readonly timeSheetService: TimeSheetService) {}

  @Post()
  async create(@Body() createTimeSheetDto: CreateTimeSheetDto) {
    return this.timeSheetService.create(createTimeSheetDto);
  }

  @Get()
  async findAll() {
    return this.timeSheetService.findAll();
  }

  //Más métodos para manejar PUT, DELETE, etc.
}
