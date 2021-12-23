import { IsNumber } from 'class-validator';

export class FindStageDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  id: number;
}
