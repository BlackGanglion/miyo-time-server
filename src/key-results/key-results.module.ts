import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyResultsController } from './key-results.controller';
import { KeyResultsService } from './key-results.service';
import { KeyResult } from '../entities/key-results.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KeyResult])],
  controllers: [KeyResultsController],
  providers: [KeyResultsService],
})
export class KeyResultsModule { }