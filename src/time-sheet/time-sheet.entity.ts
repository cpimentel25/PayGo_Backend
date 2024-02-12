import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class TimeSheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeName: string; // Ajustar el nombre [camelCase]

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  hourlyRate: number;

  @Column()
  hours: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Ajustar para calcular el pago total correctamente
  totalPay: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column({ default: 'Pending' })
  status: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.timeSheets)
  user: User;
}
