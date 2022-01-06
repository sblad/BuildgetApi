import { UpdateStageDto } from '../persistence/dtos/updateStage.dto';
import { CreateStageDto } from '../persistence/dtos/createStage.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth-guard';
import { StageService } from './stage.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('stage')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Get()
  findAll(@Req() req) {
    const userId = req.user.id;

    return this.stageService.findAll(userId);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;

    return this.stageService.findOne({ userId, id });
  }

  @Post()
  createStage(@Req() req, @Body() createStageDto: CreateStageDto) {
    const userId = req.user.id;

    return this.stageService.create({ ...createStageDto, userId });
  }

  @Delete(':id')
  removeStage(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;

    this.stageService.remove(id, userId);
  }

  @Patch(':id')
  updateStage(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStageDto: UpdateStageDto,
  ) {
    const userId = req.user.id;

    return this.stageService.update(updateStageDto, id, userId);
  }
}
