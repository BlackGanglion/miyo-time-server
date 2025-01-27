import { Controller, Post, Body } from '@nestjs/common';
import { KeyResultsService } from './key-results.service';
import { CreateKeyResultDto } from '../dto/key-result.dto';

@Controller('key-results')
export class KeyResultsController {
  constructor(private readonly keyResultsService: KeyResultsService) {}

  @Post()
  async create(@Body() createKeyResultDto: CreateKeyResultDto) {
    return this.keyResultsService.create(createKeyResultDto);
  }
}