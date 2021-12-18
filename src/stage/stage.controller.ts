import { Controller, Get } from '@nestjs/common';

@Controller('stage')
export class StageController {
  @Get()
  findAll() {
    return [{ type: 1, steps: [] }];
  }
}
