import { IsNumber, IsOptional } from 'class-validator';

export class FindStageDto {
  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNumber()
  id: number;
}
