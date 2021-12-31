import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStepDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  contractorId: number;

  @IsNumber()
  stageId: number;

  @IsNumber()
  @IsOptional()
  userId: number;
}
