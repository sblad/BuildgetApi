import { ApiHideProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContractorDto {
  @IsString()
  name: string;

  @IsString()
  contact: string;

  @IsNumber()
  @IsOptional()
  @ApiHideProperty()
  userId: number;
}
