import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }