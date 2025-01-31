import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../entities/records.entity';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { Task } from '../entities/tasks.entity';
import { TasksService } from '../tasks/tasks.service';
import { Goal } from '../entities/goals.entity';
import { KeyResult } from '../entities/key-results.entity';
import { GoalsService } from '../goals/goals.service';
import { KeyResultsService } from '../goals/key-results.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record, Task, Goal, KeyResult]),
  ],
  controllers: [RecordsController],
  providers: [RecordsService, TasksService, GoalsService, KeyResultsService],
})
export class RecordsModule { }