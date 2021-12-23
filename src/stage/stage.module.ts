import { StageService } from './stage.service';
import { StageController } from './stage.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [StageController],
  providers: [StageService],
})
export class StageModule {}
