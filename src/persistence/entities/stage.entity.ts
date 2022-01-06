import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Step } from './step.entity';
import { CreateStageDto } from '../dtos/createStage.dto';
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
  @ApiHideProperty()
  userId: number;

  @Column()
  @ApiProperty({ enum: ['created', 'inprogress', 'completed'] })
  status: StageStatus;

  @OneToMany(() => Step, (step) => step.stage)
  @ApiHideProperty()
  steps: Step[];

  create(createStageDto: CreateStageDto) {
    this.name = createStageDto.name;
    this.type = createStageDto.type;
    this.userId = createStageDto.userId;
    this.status = StageStatus.Created;
  }

  checkEligibility(userStages: Stage[], type: string) {
    const isAlreadyCreated = !!userStages.find((stage) => stage.type === type);

    if (isAlreadyCreated) {
      throw new BadRequestException('Stage already exists');
    }
  }
}

export enum StageStatus {
  Created = 'created',
  InProgress = 'inprogress',
  Completed = 'completed',
}
