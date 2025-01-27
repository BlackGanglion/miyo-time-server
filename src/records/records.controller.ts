import { Controller, Post, Body } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from '../dto/record.dto';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) { }

  @Post()
  async create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }
}
