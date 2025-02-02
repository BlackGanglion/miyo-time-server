import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateTaskDto } from '../dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) { }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  async findAll() {
    return this.tasksService.findAllTasks();
  }

  @Get(':taskId')
  async findOne(@Param('taskId') taskId: string) {
    return this.tasksService.findOne(taskId);
  }

  @Put(':taskId')
  async update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: CreateTaskDto
  ) {
    return this.tasksService.updateTask(taskId, updateTaskDto);
  }

  @Delete(':taskId')
  async delete(@Param('taskId') taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }
}
