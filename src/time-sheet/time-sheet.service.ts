import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeSheet } from './time-sheet.entity';
import { CreateTimeSheetDto } from './dto/create-time-sheet.dto';
import { UpdateTimeSheetDto } from './dto/update-time-sheet.dto';

@Injectable()
export class TimeSheetService {
  constructor(
    @InjectRepository(TimeSheet)
    private readonly timeSheetRepository: Repository<TimeSheet>,
  ) {}

  async create(
    createTimeSheetDtos: CreateTimeSheetDto[] | CreateTimeSheetDto,
  ): Promise<TimeSheet[]> {
    const dtos = Array.isArray(createTimeSheetDtos)
      ? createTimeSheetDtos
      : [createTimeSheetDtos];
    const timeSheets = dtos.map((dto) => {
      const newTimeSheet = new TimeSheet();
      newTimeSheet.employeeName = dto.employeeName;
      newTimeSheet.hourlyRate = dto.hourlyRate;
      newTimeSheet.hours = dto.hours;
      newTimeSheet.totalPay = newTimeSheet.hourlyRate * newTimeSheet.hours;
      newTimeSheet.date = new Date();
      newTimeSheet.description = dto.description;
      newTimeSheet.status = 'Pending';
      newTimeSheet.userId = dto.userId;
      return newTimeSheet;
    });

    return this.timeSheetRepository.save(timeSheets);
  }

  async findAll(): Promise<TimeSheet[]> {
    return this.timeSheetRepository.find();
  }

  async findByUserId(userId: number) {
    return this.timeSheetRepository.find({ where: { userId } });
  }

  async update(id: number, updateTimeSheetDto: UpdateTimeSheetDto) {
    const timeSheet = await this.timeSheetRepository.findOne({ where: { id } });
    if (!timeSheet) {
      throw new NotFoundException(
        `La hoja de tiempo con ID "${id}" no fue encontrada.`,
      );
    }

    // Lógica adicional para manejar casos específicos.
    // Ejemplo: validar que el usuario que realiza la petición sea el propietario de la hoja de tiempo,

    // Actualiza y guarda el registro con los nuevos valores
    Object.assign(timeSheet, updateTimeSheetDto);
    return this.timeSheetRepository.save(timeSheet);
  }

  // Más métodos para CRUD ->
}
