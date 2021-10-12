import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { MainDbService } from 'src/common/main-db/main-db.service';
import * as dayjs from 'dayjs';
import { RequestStatus } from './entities/request.entity';

@Injectable()
export class RequestsService {
  private collectionName: string;
  private collectionRef;

  constructor(private readonly dbService: MainDbService) {
    this.collectionName = dbService.collections.requests;
    this.collectionRef = dbService.getCollection(this.collectionName);
  }

  async create(createRequestDto: CreateRequestDto) {
    const id = createRequestDto.dui;
    const now = dayjs().format();
    const payload = {
      ...createRequestDto,
      createAt: now,
      status: RequestStatus.PENDING,
      lastUpdate: now,
    };
    const result = await this.dbService.createDocumentWithCustomId<any>(
      this.collectionName,
      id,
      payload,
    );
    const data = {
      id,
      ...payload,
    };
    return data;
  }

  async findAll() {
    const result = await this.collectionRef.get();
    const items = await this.dbService.parseFirestoreItemsResponse(result);
    return items;
  }

  findOne(id: string) {
    return `This action returns a #${id} request`;
  }

  async update(id: string, updateRequestDto: UpdateRequestDto) {
    const now = dayjs().format();
    const document = await this.dbService.getDocumentById(
      this.collectionName,
      id,
    );
    const payload = {
      lastUpdate: now,
      ...updateRequestDto,
    };
    const result = await this.dbService.update(document, payload);
    return result;
  }

  remove(id: string) {
    return `This action removes a #${id} request`;
  }
}
