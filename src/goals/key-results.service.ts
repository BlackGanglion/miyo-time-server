import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeyResult } from '../entities/key-results.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateKeyResultDto, UpdateKeyResultDto } from '../dto/key-result.dto';

@Injectable()
export class KeyResultsService {
  constructor(
    @InjectRepository(KeyResult)
    private keyResultsRepository: Repository<KeyResult>,
  ) { }

  async create(createKeyResultDto: CreateKeyResultDto): Promise<KeyResult> {
    const keyResult = this.keyResultsRepository.create(createKeyResultDto);
    return this.keyResultsRepository.save(keyResult);
  }

  async findAll(goalId: string): Promise<KeyResult[]> {
    return this.keyResultsRepository.find({ where: { goalId: Number(goalId) } });
  }

  async update(updateKeyResultDto: UpdateKeyResultDto): Promise<KeyResult> {
    const keyResult = await this.keyResultsRepository.findOne({ where: { id: updateKeyResultDto.id } });
    if (!keyResult) {
      throw new NotFoundException('Key result not found');
    }
    return this.keyResultsRepository.save({ ...keyResult, ...updateKeyResultDto });
  }

  async removeByGoalId(goalId: string): Promise<DeleteResult> {
    return this.keyResultsRepository.delete({ goalId: Number(goalId) });
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.keyResultsRepository.delete(id);
  }

  async findAllByGoalId(goalId: string): Promise<KeyResult[]> {
    return this.keyResultsRepository.find({ where: { goalId: Number(goalId) } });
  }

  async findById(id: string): Promise<KeyResult | null> {
    return this.keyResultsRepository.findOne({ where: { id: Number(id) } });
  }
}
