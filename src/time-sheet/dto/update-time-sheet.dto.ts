import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeSheetDto } from './create-time-sheet.dto';

export class UpdateTimeSheetDto extends PartialType(CreateTimeSheetDto) {
  //Añadir cualquier validación adicional solo si es necesario
}
