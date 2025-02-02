import { Controller, Post, Body, Put, Param, Get, Query, Delete } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from '../dto/record.dto';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) { }

  @Get('/groupByDate')
  async groupByDate(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.recordsService.groupByDate(startDate, endDate);
  }

  @Get('/groupByCategory')
  async groupByCategory(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.recordsService.groupByCategory(startDate, endDate);
  }

  @Get('/category')
  async categorylist() {
    return this.recordsService.findRecordsGroupedByCategory();
  }

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

  @Delete(':recordId')
  async delete(@Param('recordId') recordId: string) {
    return this.recordsService.delete(recordId);
  }
}
