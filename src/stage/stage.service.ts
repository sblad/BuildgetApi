import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStageDto } from 'src/persistence/dtos/createStageDto';
import { FindStageDto } from 'src/persistence/dtos/findStageDto';
import { UpdateStageDto } from 'src/persistence/dtos/updateStageDto';
import { Stage } from 'src/persistence/entities/stage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
  ) {}

  findAll(userId: number) {
    return this.stageRepository.find({ userId });
  }

  async findOne(findStageDto: FindStageDto) {
    const { id, userId } = findStageDto;

    const itemFound = await this.stageRepository.findOne({ id, userId });

    if (!itemFound) {
      throw new BadRequestException('Item not found');
    }

    return itemFound;
  }

  async create(createStageDto: CreateStageDto) {
    const userStages = await this.findAll(createStageDto.userId);

    const stage = new Stage();

    stage.checkEligibility(userStages, createStageDto.type);
    stage.create(createStageDto);
    stage.save();

    return stage;
  }

  async remove(stageId: number, userId: number) {
    const stage = await this.findOne({ id: stageId, userId });

    if (!stage) {
      throw new BadRequestException('Stage not found');
    }

    stage.remove();
  }

  async update(updateStageDto: UpdateStageDto, id: number, userId: number) {
    const item = await this.stageRepository.save({
      ...updateStageDto,
      id,
      userId,
    });

    delete item.userId;

    return item;
  }
}
