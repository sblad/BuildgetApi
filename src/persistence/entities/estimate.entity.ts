import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { EstimateStep } from './estimateStep.entity';
import { Step } from './step.entity';

@Entity()
export class Estimate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Exclude()
  userId: number;

  @OneToOne(() => Step, (step) => step.estimate)
  @Exclude()
  step: Step;

  @OneToMany(() => EstimateStep, (estimateStep) => estimateStep.estimate)
  estimateSteps: EstimateStep[];

  create(userId: number, step: Step) {
    this.userId = userId;
    this.step = step;
  }
}
