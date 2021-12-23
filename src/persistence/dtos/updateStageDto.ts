import { IsString, IsOptional } from 'class-validator';

export class UpdateStageDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  type: string;
}
