import { UpdateStepDto } from '../persistence/dtos/updateStep.dto';
import { CreateStepDto } from '../persistence/dtos/createStep.dto';
import { StepService } from './step.service';
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
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('step')
@ApiTags('Step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Get()
  findAll(@Req() req) {
    const userId = req.user.id;

    return this.stepService.findAll(userId);
  }

  @Post()
  createStep(@Req() req, @Body() createStepDto: CreateStepDto) {
    const userId = req.user.id;

    return this.stepService.create({ ...createStepDto, userId });
  }

  @Patch(':id')
  updateStage(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStepDto: UpdateStepDto,
  ) {
    const userId = req.user.id;

    return this.stepService.update(updateStepDto, id, userId);
  }

  @Delete(':id')
  removeStage(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;

    this.stepService.remove(id, userId);
  }
}
