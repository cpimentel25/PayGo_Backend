import { IsNotEmpty, IsDecimal, IsString } from 'class-validator';

export class CreateTimeSheetDto {
  @IsString()
  @IsNotEmpty()
  employeeName: string;

  @IsDecimal()
  @IsNotEmpty()
  hourlyRate: number;

  @IsNotEmpty()
  hours: number;

  // totalPay se calcula en el backend, no se necesita en el DTO (Importante!)

  @IsString()
  description: string;

  @IsNotEmpty()
  userId: number;
}
