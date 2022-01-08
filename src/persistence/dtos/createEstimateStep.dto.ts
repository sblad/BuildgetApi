import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { EstimateType } from '../entities/estimateStep.entity';

export class CreateEstimateStepDto {
  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNumber()
  estimateId: number;

  @IsEnum(EstimateType)
  type: EstimateType;
}
