import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Goal } from '../entities/goals.entity';
import { CreateGoalDto } from '../dto/goal.dto';
import { KeyResultsService } from './key-results.service';
import { Task } from '../entities/tasks.entity';

export interface CreateGoalDtoParams extends CreateGoalDto {
  keyResults?: Array<{ resultName: string }>;
}

export interface UpdateGoalDtoParams extends Partial<CreateGoalDto> {
  keyResults?: Array<{ resultName: string, goalId?: number, id?: number }>;
}

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private goalsRepository: Repository<Goal>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private readonly keyResultsService: KeyResultsService,
  ) { }

  async create(createGoalDto: CreateGoalDtoParams): Promise<Goal> {
    const goal = await this.goalsRepository.save(this.goalsRepository.create(createGoalDto));
    (createGoalDto.keyResults || []).forEach(keyResult => this.keyResultsService.create({
      ...keyResult,
      goalId: goal.id,
    }));
    return goal;
  }

  async findAll(): Promise<Goal[]> {
    const goals = await this.goalsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    const goalsWithKeyResults = await Promise.all(goals.map(async goal => {
      const keyResults = await this.keyResultsService.findAll(String(goal.id));
      const tasks = await Promise.all(keyResults.map(async keyResult => {
        return this.taskRepository.find({ where: { keyResultId: Number(keyResult.id) } });
      }));
      return {
        ...goal,
        keyResults,
        tasks: tasks.flat(),
      };
    }));
    return goalsWithKeyResults;
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.keyResultsService.removeByGoalId(id);
    return this.goalsRepository.delete(id);
  }

  async update(id: string, updateGoalDto: UpdateGoalDtoParams): Promise<UpdateResult> {
    const existingKeyResults = await this.keyResultsService.findAllByGoalId(id);

    const keyResultsToDelete = existingKeyResults.filter(existingKeyResult =>
      !(updateGoalDto.keyResults || []).some(keyResult => keyResult.id === existingKeyResult.id)
    );

    await Promise.all(keyResultsToDelete.map(keyResult => this.keyResultsService.remove(String(keyResult.id))));

    (updateGoalDto.keyResults || []).forEach(keyResult => {
      if (keyResult.id) {
        return this.keyResultsService.update({
          resultName: keyResult.resultName,
          goalId: Number(id),
          id: keyResult.id,
        });
      }
      return this.keyResultsService.create({
        resultName: keyResult.resultName,
        goalId: Number(id)
      });
    });

    return this.goalsRepository.update(id, {
      goalName: updateGoalDto.goalName
    });
  }

  async findOne(id: string): Promise<Goal | null> {
    return this.goalsRepository.findOne({ where: { id: Number(id) } });
  }
}
