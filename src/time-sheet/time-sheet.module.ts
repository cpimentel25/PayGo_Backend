import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSheetService } from './time-sheet.service';
import { TimeSheetController } from './time-sheet.controller';
import { TimeSheet } from './time-sheet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSheet])],
  controllers: [TimeSheetController],
  providers: [TimeSheetService],
  exports: [TimeSheetService],
})
export class TimeSheetModule {}
