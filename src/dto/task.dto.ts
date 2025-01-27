import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  taskName: string;

  @IsString()
  @IsNotEmpty()
  taskCron: string;

  @IsInt()
  @IsOptional()
  keyResultId?: number;
}
