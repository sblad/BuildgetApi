import { EstimateStep } from './../persistence/entities/estimateStep.entity';
import { Module } from '@nestjs/common';
import { EstimateService } from './estimate.service';
import { EstimateController } from './estimate.controller';
import { EstimateStepService } from './estimateStep.service';
import { Estimate } from 'src/persistence/entities/estimate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from 'src/persistence/entities/step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estimate, EstimateStep, Step])],
  providers: [EstimateService, EstimateStepService],
  controllers: [EstimateController],
})
export class EstimateModule {}
