import { CreateStageDto } from './../dtos/createStageDto';
import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';
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

  apply(createStageDto: CreateStageDto) {
    this.name = createStageDto.name;
    this.type = createStageDto.type;
    this.userId = createStageDto.userId;
  }

  checkEligibility(userStages: Stage[], type: string) {
    const isAlreadyCreated = !!userStages.find((stage) => stage.type === type);

    if (isAlreadyCreated) {
      throw new BadRequestException('Stage already exists');
    }
  }
}
