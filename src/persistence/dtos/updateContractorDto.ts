import { IsString } from 'class-validator';

export class UpdateContractorDto {
  @IsString()
  name: string;

  @IsString()
  contact: string;
}
