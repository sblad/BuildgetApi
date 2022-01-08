import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

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
  @ApiHideProperty()
  userId: number;

  @IsDate()
  beginDate: Date;

  @IsDate()
  endDate: Date;
}
