import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from '../entities/goals.entity';
import { CreateGoalDto } from '../dto/goal.dto';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private goalsRepository: Repository<Goal>,
  ) { }

  async create(createGoalDto: CreateGoalDto): Promise<Goal> {
    const goal = this.goalsRepository.create(createGoalDto);
    return this.goalsRepository.save(goal);
  }
}
