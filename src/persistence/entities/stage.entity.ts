import { Step } from './step.entity';
import { CreateStageDto } from './../dtos/createStageDto';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Exclude } from 'class-transformer';

@Entity()
export class Stage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  @Exclude()
  userId: number;

  @Column()
  status: 'created' | 'inprogress' | 'completed';

  @OneToMany(() => Step, (step) => step.stage)
  steps: Step[];

  create(createStageDto: CreateStageDto) {
    this.name = createStageDto.name;
    this.type = createStageDto.type;
    this.userId = createStageDto.userId;
    this.status = 'created';
  }

  checkEligibility(userStages: Stage[], type: string) {
    const isAlreadyCreated = !!userStages.find((stage) => stage.type === type);

    if (isAlreadyCreated) {
      throw new BadRequestException('Stage already exists');
    }
  }
}
