import { CreateEstimateStepDto } from './../persistence/dtos/createEstimateStepDto';
import { EstimateService } from './estimate.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth-guard';
import { EstimateStepService } from './estimateStep.service';

@Controller('estimate')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class EstimateController {
  constructor(
    private readonly estimateService: EstimateService,
    private readonly estimateStepService: EstimateStepService,
  ) {}

  @Get(':stepId')
  findAll(@Req() req, @Param('stepId', ParseIntPipe) stepId: number) {
    const userId = req.user.id;

    return this.estimateService.findAll(userId, stepId);
  }

  @Get('step/:estimateId')
  findAllSteps(
    @Req() req,
    @Param('estimateId', ParseIntPipe) estimateId: number,
  ) {
    const userId = req.user.id;

    return this.estimateStepService.findAll(userId, estimateId);
  }

  @Post()
  createEstimate(@Req() req, @Body() body) {
    const userId = req.user.id;

    return this.estimateService.create(userId, body.stepId);
  }

  @Post('step')
  createStep(@Req() req, @Body() createEstimateStepDto: CreateEstimateStepDto) {
    const userId: number = req.user.id;

    return this.estimateStepService.create({
      ...createEstimateStepDto,
      userId,
    });
  }

  @Delete('delete/:id')
  removeEstimate(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;

    this.estimateService.remove(id, userId);
  }

  @Delete('step/:id')
  removeEstimateStep(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;

    this.estimateStepService.remove(id, userId);
  }
}
