import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContractorDto {
  @IsString()
  name: string;

  @IsString()
  contact: string;

  @IsNumber()
  @IsOptional()
  userId: number;
}
