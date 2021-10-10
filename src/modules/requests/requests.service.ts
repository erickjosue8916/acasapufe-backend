import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { MainDbService } from 'src/common/main-db/main-db.service';
import dayjs from 'dayjs';

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
    const payload = {
      ...createRequestDto,
      createAt: dayjs().format(),
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
    const document = await this.dbService.getDocumentById(
      this.collectionName,
      id,
    );
    const result = await this.dbService.update(document, updateRequestDto);
    return result;
  }

  remove(id: string) {
    return `This action removes a #${id} request`;
  }
}
