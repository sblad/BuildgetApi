import { Step } from './step.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { CreateContractorDto } from '../dtos/createContractorDto';
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
  userId: number;

  @OneToMany(() => Step, (step) => step.contractor)
  steps: Step[];

  create(createContractorDto: CreateContractorDto) {
    this.name = createContractorDto.name;
    this.contact = createContractorDto.contact;
    this.userId = createContractorDto.userId;
  }
}
