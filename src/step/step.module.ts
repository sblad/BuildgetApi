import { Stage } from './../persistence/entities/stage.entity';
import { Step } from './../persistence/entities/step.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepController } from './step.controller';
import { StepService } from './step.service';

@Module({
  imports: [TypeOrmModule.forFeature([Step, Stage])],
  controllers: [StepController],
  providers: [StepService],
})
export class StepModule {}
