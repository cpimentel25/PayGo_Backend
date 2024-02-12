import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeSheet } from './time-sheet.entity';
import { CreateTimeSheetDto } from './dto/create-time-sheet.dto';

@Injectable()
export class TimeSheetService {
  constructor(
    @InjectRepository(TimeSheet)
    private readonly timeSheetRepository: Repository<TimeSheet>,
  ) {}

  async create(createTimeSheetDto: CreateTimeSheetDto): Promise<TimeSheet> {
    const newTimeSheet = new TimeSheet();
    newTimeSheet.employeeName = createTimeSheetDto.employeeName;
    newTimeSheet.hourlyRate = createTimeSheetDto.hourlyRate;
    newTimeSheet.hours = createTimeSheetDto.hours;
    newTimeSheet.totalPay = newTimeSheet.hourlyRate * newTimeSheet.hours; // Calcular el pago total
    newTimeSheet.date = new Date();
    newTimeSheet.description = createTimeSheetDto.description;
    newTimeSheet.status = 'Pending'; // Estado inicial
    newTimeSheet.userId = createTimeSheetDto.userId;

    return this.timeSheetRepository.save(newTimeSheet);
  }

  async findAll(): Promise<TimeSheet[]> {
    return this.timeSheetRepository.find();
  }

  // Más métodos para CRUD ->
}
