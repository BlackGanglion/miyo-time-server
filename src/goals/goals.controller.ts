import { Controller, Post, Get, Delete, Param, Body, Put } from '@nestjs/common';
import { CreateGoalDtoParams, GoalsService, UpdateGoalDtoParams } from './goals.service';
import { KeyResultsService } from './key-results.service';

@Controller('goals')
export class GoalsController {
  constructor(
    private readonly goalsService: GoalsService,
    private readonly keyResultsService: KeyResultsService
  ) { }

  @Post()
  async create(@Body() createGoalDto: CreateGoalDtoParams) {
    return this.goalsService.create(createGoalDto);
  }

  @Get()
  async findAll() {
    return this.goalsService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.goalsService.remove(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDtoParams) {
    return this.goalsService.update(id, updateGoalDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const goal = await this.goalsService.findOne(id);
    const keyResults = await this.keyResultsService.findAll(id);
    return {
      ...goal,
      keyResults
    }
  }
}
