import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  taskName: string;

  @Column({ type: 'varchar', length: 255 })
  taskCron: string | null;

  @CreateDateColumn()
  taskTime: Date | null;

  @Column({ type: 'int', nullable: true })
  keyResultId: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
