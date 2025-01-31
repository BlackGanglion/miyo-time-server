import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Record } from '../entities/records.entity';
import { CreateRecordDto } from '../dto/record.dto';
import { RecordType } from './type';
import { TasksService } from '../tasks/tasks.service';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
    private readonly taskService: TasksService
  ) { }

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    const record = this.recordsRepository.create(createRecordDto);
    return this.recordsRepository.save(record);
  }

  async update(recordId: string, updateRecordDto: Partial<CreateRecordDto>): Promise<UpdateResult> {
    const record = await this.recordsRepository.findOne({ where: { id: Number(recordId) } });
    if (!record) {
      throw new NotFoundException('record not found');
    }
    return this.recordsRepository.update(recordId, updateRecordDto);
  }

  async findRecordById(recordId: string): Promise<RecordType> {
    const record = await this.recordsRepository.findOne({ where: { id: Number(recordId) } });
    if (!record) {
      throw new NotFoundException('Record not found');
    }
    const taskId = record.taskId;
    if (taskId) {
      const task = await this.taskService.findOne(String(taskId));
      return {
        ...record,
        task,
      }
    }
    return {
      ...record,
      task: null,
    }
  }

  async findRecordsByDateRange(startDate: string, endDate: string): Promise<any> {
    const records = await this.recordsRepository.find({
      where: {
        startTime: MoreThanOrEqual(new Date(startDate)),
        endTime: LessThanOrEqual(new Date(endDate))
      }
    });

    const groupedRecords = records.reduce((acc, record) => {
      const startDay = record.startTime.toISOString().split('T')[0];
      const endDay = record.endTime.toISOString().split('T')[0];

      if (!acc[startDay]) {
        acc[startDay] = [];
      }
      acc[startDay].push(record);

      if (startDay !== endDay) {
        if (!acc[endDay]) {
          acc[endDay] = [];
        }
        acc[endDay].push(record);
      }

      return acc;
    }, {});

    return groupedRecords;
  }
}
