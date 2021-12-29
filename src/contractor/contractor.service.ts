import { CreateContractorDto } from './../persistence/dtos/createContractorDto';
import { Contractor } from './../persistence/entities/contractor.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateContractorDto } from 'src/persistence/dtos/updateContractorDto';

@Injectable()
export class ContractorService {
  constructor(
    @InjectRepository(Contractor)
    private readonly contractorRepository: Repository<Contractor>,
  ) {}

  findAll(userId: number) {
    return this.contractorRepository.find({ userId });
  }

  async findOne(id: number, userId: number) {
    const itemFound = await this.contractorRepository.findOne({ id, userId });

    if (!itemFound) {
      throw new BadRequestException('Contractor not found');
    }

    return itemFound;
  }

  async create(createContractorDto: CreateContractorDto, userId: number) {
    const contractor = new Contractor();

    contractor.create({ ...createContractorDto, userId });
    contractor.save();

    return contractor;
  }

  async remove(contractorId: number, userId: number) {
    const contractor = await this.findOne(contractorId, userId);

    if (!contractor) {
      throw new BadRequestException('Contractor not found');
    }

    contractor.remove();
  }

  async update(
    updateContractorDto: UpdateContractorDto,
    id: number,
    userId: number,
  ) {
    const item = await this.contractorRepository.save({
      ...updateContractorDto,
      id,
      userId,
    });

    return item;
  }
}
