import { ApiHideProperty } from '@nestjs/swagger';
import { Step } from './step.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { CreateContractorDto } from '../dtos/createContractor.dto';
import { Exclude } from 'class-transformer';

@Entity()
export class Contractor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contact: string;

  @Column()
  @Exclude()
  @ApiHideProperty()
  userId: number;

  @OneToMany(() => Step, (step) => step.contractor)
  @ApiHideProperty()
  steps: Step[];

  create(createContractorDto: CreateContractorDto) {
    this.name = createContractorDto.name;
    this.contact = createContractorDto.contact;
    this.userId = createContractorDto.userId;
  }
}
