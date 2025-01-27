import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateKeyResultDto {
  @IsString()
  @IsNotEmpty()
  resultName: string;

  @IsInt()
  @IsNotEmpty()
  goalId: number;
}
