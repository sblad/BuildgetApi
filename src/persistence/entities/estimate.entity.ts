import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  OneToMany,
  OneToOne,
  AfterLoad,
  getRepository,
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

  totalCost: number;

  @OneToMany(() => EstimateStep, (estimateStep) => estimateStep.estimate)
  estimateSteps: EstimateStep[];

  @AfterLoad()
  async updateTotalCost() {
    const steps = await getRepository(EstimateStep).find({
      estimateId: this.id,
    });

    if (!steps) {
      this.totalCost = 0;
      return;
    }

    this.totalCost = steps.reduce((acc, val) => acc + val.price, 0);
  }

  create(userId: number, step: Step) {
    this.userId = userId;
    this.step = step;
  }
}
