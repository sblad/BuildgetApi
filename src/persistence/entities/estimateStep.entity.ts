import { Estimate } from './estimate.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { CreateEstimateStepDto } from '../dtos/createEstimateStep.dto';

@Entity()
export class EstimateStep extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  type: EstimateType;

  @Column()
  @Exclude()
  userId: number;

  @ManyToOne(() => Estimate, (estimate) => estimate.estimateSteps)
  estimate: Estimate;

  @Column()
  @Exclude()
  estimateId: number;

  create(createEstimateStepDto: CreateEstimateStepDto) {
    this.description = createEstimateStepDto.description;
    this.userId = createEstimateStepDto.userId;
    this.price = createEstimateStepDto.price;
    this.estimateId = createEstimateStepDto.estimateId;
    this.type = createEstimateStepDto.type;
  }
}

export enum EstimateType {
  Material = 'material',
  Work = 'work',
  Other = 'other',
}
