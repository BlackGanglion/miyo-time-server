import { Controller, Post, Get, Body } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from '../dto/goal.dto';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) { }

  @Post()
  async create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.create(createGoalDto);
  }

  @Get()
  async findAll() {
    return this.goalsService.findAll();
  }
}
