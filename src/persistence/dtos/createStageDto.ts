import { Exclude } from 'class-transformer';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateStageDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  @IsOptional()
  userId: number;
}
