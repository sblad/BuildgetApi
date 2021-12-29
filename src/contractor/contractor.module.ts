import { ContractorService } from './contractor.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contractor } from 'src/persistence/entities/contractor.entity';
import { ContractorController } from './contractor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contractor])],
  controllers: [ContractorController],
  providers: [ContractorService],
})
export class ContractorModule {}
