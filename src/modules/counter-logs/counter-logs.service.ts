import { Injectable } from '@nestjs/common';
import { CreateCounterLogDto } from './dto/create-counter-log.dto';
import { UpdateCounterLogDto } from './dto/update-counter-log.dto';

@Injectable()
export class CounterLogsService {
  create(createCounterLogDto: CreateCounterLogDto) {
    return 'This action adds a new counterLog';
  }

  findAll() {
    return `This action returns all counterLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} counterLog`;
  }

  update(id: number, updateCounterLogDto: UpdateCounterLogDto) {
    return `This action updates a #${id} counterLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} counterLog`;
  }
}
