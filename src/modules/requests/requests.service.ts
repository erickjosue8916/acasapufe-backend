import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { MainDbService } from 'src/common/main-db/main-db.service';

@Injectable()
export class RequestsService {
  private collectionName: string;
  private collectionRef;

  constructor(private readonly dbService: MainDbService) {
    this.collectionName = dbService.collections.requests;
    this.collectionRef = dbService.getCollection(this.collectionName);
  }

  create(createRequestDto: CreateRequestDto) {
    return 'This action adds a new request';
  }

  findAll() {
    return `This action returns all requests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
