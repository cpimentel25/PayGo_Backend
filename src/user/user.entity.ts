import { TimeSheet } from '../time-sheet/time-sheet.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  is_admin: boolean;

  @OneToMany(() => TimeSheet, (timeSheet) => timeSheet.user)
  timeSheets: TimeSheet[];
}
