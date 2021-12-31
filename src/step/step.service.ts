import { CreateStepDto } from './../persistence/dtos/createStepDto';
import { Step } from './../persistence/entities/step.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStepDto } from 'src/persistence/dtos/updateStepDto';
import { Stage } from 'src/persistence/entities/stage.entity';
import { Contractor } from 'src/persistence/entities/contractor.entity';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
    @InjectRepository(Contractor)
    private readonly contractorRepository: Repository<Contractor>,
  ) {}

  findAll(userId: number) {
    return this.stepRepository.find({ userId });
  }

  async create(createStepDto: CreateStepDto) {
    const step = new Step();
    const stage = await this.stageRepository.findOne(createStepDto.stageId);

    if (!stage) {
      throw new BadRequestException('Stage not found');
    }

    const contractor = await this.contractorRepository.findOne({
      id: createStepDto.contractorId,
      userId: createStepDto.userId,
    });

    step.create(createStepDto, stage, contractor);
    await step.save();

    return step;
  }

  async remove(stepId: number, userId: number) {
    const step = await this.stepRepository.findOne({ id: stepId, userId });

    if (!step) {
      throw new BadRequestException('Step not found');
    }

    step.remove();
  }

  async update(updateStepDto: UpdateStepDto, id: number, userId: number) {
    const step = await this.stepRepository.findOne({ id, userId });

    if (!step) {
      throw new BadRequestException('Step not found');
    }

    step.update(updateStepDto);
    await step.save();

    return step;
  }
}
