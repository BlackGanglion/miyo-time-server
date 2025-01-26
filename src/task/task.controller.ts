import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  async getTasks(@Query('date') date?: string) {
    return this.taskService.getTasksByDate(date);
  }
}
