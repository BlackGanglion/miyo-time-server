import { Controller, Post, Body, Put, Param, Get, Query } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from '../dto/record.dto';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) { }

  @Post()
  async create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }

  @Put(':recordId')
  async update(
    @Param('recordId') recordId: string,
    @Body() updateRecordDto: Partial<CreateRecordDto>
  ) {
    return this.recordsService.update(recordId, updateRecordDto);
  }

  @Get(':recordId')
  async findOne(@Param('recordId') recordId: string) {
    return this.recordsService.findRecordById(recordId);
  }

  @Get('filter')
  async filterByDateRange(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const today = new Date().toISOString().split('T')[0];
    startDate = startDate || today;
    endDate = endDate || today;

    return this.recordsService.findRecordsByDateRange(startDate, endDate);
  }
}
