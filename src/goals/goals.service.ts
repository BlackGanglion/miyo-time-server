import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, DeleteResult, UpdateResult } from 'typeorm';
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

  async findAll(): Promise<Goal[]> {
    const options: FindManyOptions<Goal> = {
      order: {
        createdAt: 'DESC',
      },
    };
    return this.goalsRepository.find(options);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.goalsRepository.delete(id);
  }

  async update(id: string, updateGoalDto: Partial<CreateGoalDto>): Promise<UpdateResult> {
    return this.goalsRepository.update(id, updateGoalDto);
  }
}
