import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Put,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { TimeSheetService } from './time-sheet.service';
import { CreateTimeSheetDto } from './dto/create-time-sheet.dto';
import { User } from 'src/user/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateTimeSheetDto } from './dto/update-time-sheet.dto';

@Controller('time-sheet')
export class TimeSheetController {
  constructor(private readonly timeSheetService: TimeSheetService) {}

  @Post()
  async create(
    @Body() createTimeSheetDtos: CreateTimeSheetDto[] | CreateTimeSheetDto,
  ) {
    return this.timeSheetService.create(createTimeSheetDtos);
  }

  @UseGuards(JwtAuthGuard) // Aseguramos que el usuario este autenticado protegiendo la ruta
  @Get()
  async findAll(@User() user: any) {
    if (user.is_admin) {
      return this.timeSheetService.findAll();
    } else {
      return this.timeSheetService.findByUserId(user.userId);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTimeSheetDto: UpdateTimeSheetDto,
    @User() user: any,
  ) {
    if (!user.is_admin) {
      // Cómo manejar el acceso no autorizado
      throw new ForbiddenException(
        'No tienes permiso para realizar esta acción',
      );
    }

    return this.timeSheetService.update(+id, updateTimeSheetDto);
  }

  //Más métodos para manejar DELETE, etc.
}
