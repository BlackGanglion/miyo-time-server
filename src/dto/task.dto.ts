import { IsString, IsInt, IsOptional, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  taskName: string;

  @IsString()
  @IsOptional()
  taskCron: string | null;

  @IsDate()
  @IsOptional()
  taskTime: Date | null;

  @IsInt()
  @IsOptional()
  keyResultId?: number;
}
