import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, DeleteResult, UpdateResult } from 'typeorm';
import { Goal } from '../entities/goals.entity';
import { CreateGoalDto } from '../dto/goal.dto';
import { KeyResultsService } from './key-results.service';

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
    private readonly keyService: KeyResultsService,
  ) { }

  async create(createGoalDto: CreateGoalDtoParams): Promise<Goal> {
    const goal = await this.goalsRepository.save(this.goalsRepository.create(createGoalDto));
    (createGoalDto.keyResults || []).forEach(keyResult => this.keyService.create({
      ...keyResult,
      goalId: goal.id,
    }));
    return goal;
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
    await this.keyService.removeByGoalId(id);
    return this.goalsRepository.delete(id);
  }

  async update(id: string, updateGoalDto: UpdateGoalDtoParams): Promise<UpdateResult> {
    const existingKeyResults = await this.keyService.findAllByGoalId(id);

    const keyResultsToDelete = existingKeyResults.filter(existingKeyResult =>
      !(updateGoalDto.keyResults || []).some(keyResult => keyResult.id === existingKeyResult.id)
    );

    await Promise.all(keyResultsToDelete.map(keyResult => this.keyService.remove(String(keyResult.id))));

    (updateGoalDto.keyResults || []).forEach(keyResult => {
      if (keyResult.id) {
        return this.keyService.update({
          resultName: keyResult.resultName,
          goalId: Number(id),
          id: keyResult.id,
        });
      }
      return this.keyService.create({
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
