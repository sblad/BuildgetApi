import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstimateStep } from 'src/persistence/entities/estimateStep.entity';
import { CreateEstimateStepDto } from 'src/persistence/dtos/createEstimateStepDto';

@Injectable()
export class EstimateStepService {
  constructor(
    @InjectRepository(EstimateStep)
    private readonly estimateStepRepository: Repository<EstimateStep>,
  ) {}

  findAll(userId: number, estimateId: number) {
    return this.estimateStepRepository.find({ userId, estimateId });
  }

  create(estimateStepDto: CreateEstimateStepDto) {
    const step = new EstimateStep();

    step.create(estimateStepDto);
    step.save();

    return step;
  }

  async remove(id: number, userId: number) {
    const estimate = await this.estimateStepRepository.findOne({ id, userId });

    if (!estimate) {
      throw new BadRequestException('Estimate not found');
    }

    estimate.remove();
  }
}
