import { IsNumber, IsString, IsOptional } from 'class-validator';

import { ApiHideProperty } from '@nestjs/swagger';

export class CreateStageDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  @IsOptional()
  @ApiHideProperty()
  userId: number;
}
