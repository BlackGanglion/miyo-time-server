import { Controller, Post, Get, Delete, Patch, Param, Body } from '@nestjs/common';
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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.goalsService.remove(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGoalDto: Partial<CreateGoalDto>) {
    return this.goalsService.update(id, updateGoalDto);
  }
}
