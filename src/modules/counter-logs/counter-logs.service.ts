import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CreateCounterLogDto } from './dto/create-counter-log.dto';
import { UpdateCounterLogDto } from './dto/update-counter-log.dto';

@Injectable()
export class CounterLogsService {
  private collectionName: string;
  private collectionRef;

  constructor(private readonly dbService: MainDbService) {
    const customersCollection = dbService.collections.customers;
    this.collectionName = dbService.collections.requests;
    this.collectionRef = dbService.getCollection(this.collectionName);
  }

  async create(createCounterLogDto: CreateCounterLogDto) {
    const now = dayjs().format();
    const currentDate = dayjs().format('YYYY-MM-DD');
    const payload = {
      ...createCounterLogDto,
      createAt: now,
    };
    const result = await this.dbService.createDocumentWithCustomId<any>(
      this.collectionName,
      currentDate,
      payload,
    );
    const data = {
      id: currentDate,
      ...payload,
    };
    return data;
  }

  async findAll() {
    const result = await this.collectionRef.get();
    const items = await this.dbService.parseFirestoreItemsResponse(result);
    return items;
  }

  async findOne(id: string) {
    return `This action returns a #${id} counterLog`;
  }

  async update(id: string, updateCounterLogDto: UpdateCounterLogDto) {
    const document = await this.dbService.getDocumentById(
      this.collectionName,
      id,
    );
    const result = await this.dbService.update(document, updateCounterLogDto);
    return result;
  }

  async remove(id: string) {
    return `This action removes a #${id} counterLog`;
  }
}
