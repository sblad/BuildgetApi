import { UpdateContractorDto } from './../persistence/dtos/updateContractorDto';
import { CreateContractorDto } from './../persistence/dtos/createContractorDto';
import { ContractorService } from './contractor.service';
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

@Controller('contractor')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ContractorController {
  constructor(private readonly contractorService: ContractorService) {}

  @Get()
  findAll(@Req() req) {
    const userId = req.user.id;

    return this.contractorService.findAll(userId);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;

    return this.contractorService.findOne(id, userId);
  }

  @Post()
  createContractor(
    @Req() req,
    @Body() createContractorDto: CreateContractorDto,
  ) {
    const userId = req.user.id;

    return this.contractorService.create(createContractorDto, userId);
  }

  @Patch(':id')
  updateContractor(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContractorDto: UpdateContractorDto,
  ) {
    const userId = req.user.id;

    return this.contractorService.update(updateContractorDto, id, userId);
  }

  @Delete('delete/:id')
  removeContractor(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;

    this.contractorService.remove(id, userId);
  }
}
