import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStepDto {
  @IsString()
  name: string;

  @IsString()
  contractor: string;

  @IsNumber()
  estimate: number;

  @IsNumber()
  stageId: number;

  @IsNumber()
  @IsOptional()
  userId: number;
}
