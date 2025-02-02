import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/tasks.entity';
import { CreateTaskDto } from '../dto/task.dto';
import { KeyResultsService } from '../goals/key-results.service';
import { GoalsService } from '../goals/goals.service';
import { TaskType } from './type';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private readonly keyResultsService: KeyResultsService,
    private readonly goalsService: GoalsService,
  ) {}

  // 创建任务
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  // 更新任务
  async updateTask(taskId: string, updateTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: Number(taskId) } });
    if (!task) {
      throw new Error('Task not found');
    }
    return this.taskRepository.save({ ...task, ...updateTaskDto });
  }

  // 查询单个任务
  async findOne(id: string): Promise<TaskType | null> {
    const task = await this.taskRepository.findOne({ where: { id: Number(id) } });
    if (task && task.keyResultId) {
      if (task.keyResultId) {
        const keyResult = await this.keyResultsService.findById(String(task.keyResultId));
        if (keyResult) {
          const goal = await this.goalsService.findOne(String(keyResult.goalId));
          return {
            ...task,
            keyResult,
            goal,
          }
        }
      }
      return {
        ...task,
        keyResult: null,
        goal: null,
      }
    }
    return null;
  }

  // 任务列表
  async findAllTasks(): Promise<TaskType[]> {
    const tasks = await this.taskRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    const tasksWithKeyResultsAndGoals = await Promise.all(
      tasks.map(async task => {
        if (task.keyResultId) {
          const keyResult = await this.keyResultsService.findById(String(task.keyResultId));
          if (keyResult) {
            const goal = await this.goalsService.findOne(String(keyResult.goalId));
            return {
              ...task,
              keyResult,
              goal,
            }
          }
        }
        return {
          ...task,
          keyResult: null,
          goal: null,
        };
      })
    );
    return tasksWithKeyResultsAndGoals;
  }

  // 删除任务
  async deleteTask(taskId: string): Promise<void> {
    await this.taskRepository.delete(taskId);
  }
}
