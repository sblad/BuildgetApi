import { Injectable } from '@nestjs/common';

@Injectable()
export class StageService {
  findAll() {
    return [{ type: 1, name: 'xD', steps: [] }];
  }
}
