import { Estimate } from './estimate.entity';
import { Contractor } from './contractor.entity';
import { UpdateStepDto } from './../dtos/updateStepDto';
import { Exclude } from 'class-transformer';
import { Stage } from 'src/persistence/entities/stage.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CreateStepDto } from '../dtos/createStepDto';

@Entity()
export class Step extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Exclude()
  userId: number;

  @OneToOne(() => Estimate, (estimate) => estimate.step, { eager: true })
  @JoinColumn()
  estimate: Estimate;

  @ManyToOne(() => Stage, (stage) => stage.steps, { eager: true })
  stage: Stage;

  @ManyToOne(() => Contractor, (contractor) => contractor.steps, {
    eager: true,
  })
  contractor: Contractor;

  create(createStepDto: CreateStepDto, stage: Stage, contractor?: Contractor) {
    this.name = createStepDto.name;
    this.userId = createStepDto.userId;
    this.stage = stage;

    if (contractor) {
      this.contractor = contractor;
    }
  }

  update(updateStepDto: UpdateStepDto) {
    Object.assign(this, updateStepDto);
  }
}
