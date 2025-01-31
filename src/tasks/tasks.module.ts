import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/tasks.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Goal } from '../entities/goals.entity';
import { KeyResult } from '../entities/key-results.entity';
import { GoalsService } from '../goals/goals.service';
import { KeyResultsService } from '../goals/key-results.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Goal, KeyResult]),
  ],
  controllers: [TasksController],
  providers: [TasksService, GoalsService, KeyResultsService],
})
export class TasksModule { }