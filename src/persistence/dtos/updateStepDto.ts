import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateStepDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  contractor: string;

  @IsNumber()
  @IsOptional()
  estimate: number;
}
