import { IsString, IsInt, IsOptional, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  taskName: string;

  @IsString()
  @IsOptional()
  taskCron?: string;

  @IsDate()
  @IsOptional()
  taskTime?: Date;

  @IsInt()
  @IsOptional()
  keyResultId?: number;
}
