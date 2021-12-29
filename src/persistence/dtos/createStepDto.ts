import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStepDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  contractorId: number;

  @IsNumber()
  estimate: number;

  @IsNumber()
  stageId: number;

  @IsNumber()
  @IsOptional()
  userId: number;
}
