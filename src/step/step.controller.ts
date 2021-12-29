import { CreateStepDto } from './../persistence/dtos/createStepDto';
import { StepService } from './step.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
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

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Get()
  findAll(@Req() req) {
    const userId = req.user.id;

    return this.stepService.findAll(userId);
  }

  @Post()
  createStage(@Req() req, @Body() createStepDto: CreateStepDto) {
    const userId = req.user.id;

    return this.stepService.create({ ...createStepDto, userId });
  }

  @Patch(':id')
  updateStage(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStepDto: any,
  ) {
    const userId = req.user.id;

    return this.stepService.update(updateStepDto, id, userId);
  }
}
