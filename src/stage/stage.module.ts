import { Stage } from './../persistence/entities/stage.entity';
import { StageService } from './stage.service';
import { StageController } from './stage.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Stage])],
  controllers: [StageController],
  providers: [StageService],
})
export class StageModule {}
