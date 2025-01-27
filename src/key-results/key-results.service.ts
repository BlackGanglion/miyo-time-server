import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeyResult } from '../entities/key-results.entity';
import { Repository } from 'typeorm';
import { CreateKeyResultDto } from '../dto/key-result.dto';

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
}
