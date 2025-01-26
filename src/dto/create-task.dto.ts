import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsDate()
  @IsNotEmpty()
  startTime: Date; // 开始时间

  @IsDate()
  @IsNotEmpty()
  endTime: Date; // 结束时间

  @IsString()
  taskDescription: string; // 事项内容

  @IsString()
  @IsNotEmpty()
  taskCategory: string; // 事项分类
}
