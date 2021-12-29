import { UpdateStepDto } from './../dtos/updateStepDto';
import { Exclude } from 'class-transformer';
import { Stage } from 'src/persistence/entities/stage.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { CreateStepDto } from '../dtos/createStepDto';

@Entity()
export class Step extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contractor: string;

  @Column()
  estimate: number;

  @Column()
  @Exclude()
  userId: number;

  @ManyToOne(() => Stage, (stage) => stage.steps, { eager: true })
  @JoinTable()
  stage: Stage;

  create(createStepDto: CreateStepDto, stage: Stage) {
    this.name = createStepDto.name;
    this.contractor = createStepDto.contractor;
    this.estimate = createStepDto.estimate;
    this.userId = createStepDto.userId;
    this.stage = stage;
  }

  update(updateStepDto: UpdateStepDto) {
    Object.assign(this, updateStepDto);
  }
}
