import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) { }

  // 创建任务
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  // 按日期筛选任务
  async getTasksByDate(date?: string): Promise<Task[]> {
    // 如果提供了日期，则查询当天的任务
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      return this.taskRepository.find({
        where: {
          startTime: Between(startOfDay, endOfDay), // 使用 TypeORM 的 Between 方法
        },
        order: { startTime: 'ASC' }, // 按开始时间升序排列
      });
    }

    // 如果没有日期，则返回所有任务
    return this.taskRepository.find({
      order: { startTime: 'ASC' },
    });
  }
}