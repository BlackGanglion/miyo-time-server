import { IsString, IsDate, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  @IsNotEmpty()
  recordName: string;

  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsInt()
  @IsOptional()
  taskId?: number;
}
