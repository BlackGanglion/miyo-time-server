import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  startTime: Date;

  @Column({ type: 'datetime' })
  endTime: Date;

  @Column({ type: 'varchar', length: 255 })
  taskDescription: string;

  @Column({ type: 'varchar', length: 100 })
  taskCategory: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
