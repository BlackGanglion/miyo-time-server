import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { Goal } from '../entities/goals.entity';
import { KeyResultsService } from './key-results.service';
import { KeyResult } from '../entities/key-results.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goal, KeyResult])],
  controllers: [GoalsController],
  providers: [GoalsService, KeyResultsService],
})
export class GoalsModule { }