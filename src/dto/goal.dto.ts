import { IsString, IsNotEmpty, IsDate } from 'class-validator';

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
