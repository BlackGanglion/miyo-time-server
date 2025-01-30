import { IsString, IsNotEmpty, IsDate, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateKeyResultDto } from './key-result.dto';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  goalName: string;

  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @IsDate()
  @IsNotEmpty()
  endTime: Date;
}
