import { Estimate } from './../persistence/entities/estimate.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Step } from 'src/persistence/entities/step.entity';

@Injectable()
export class EstimateService {
  constructor(
    @InjectRepository(Estimate)
    private readonly estimateRepository: Repository<Estimate>,
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
  ) {}

  findAll(userId: number, stepId: number) {
    return this.estimateRepository.find({ userId, id: stepId });
  }

  async create(userId: number, stepId: number) {
    const estimate = new Estimate();

    const step = await this.stepRepository.findOne({ id: stepId, userId });

    if (!step) {
      throw new BadRequestException('Step not found');
    }

    if (step.estimate) {
      throw new BadRequestException('Step has estimate');
    }

    estimate.create(userId, step);
    await estimate.save();

    return estimate;
  }

  async remove(id: number, userId: number) {
    const estimate = await this.estimateRepository.findOne({ id, userId });

    if (!estimate) {
      throw new BadRequestException('Estimate not found');
    }

    estimate.remove();
  }
}
