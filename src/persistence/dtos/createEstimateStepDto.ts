import { IsNumber, IsOptional, IsString } from 'class-validator';

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
}
