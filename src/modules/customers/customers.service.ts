import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  private collectionName: string;
  private collectionRef;

  constructor(private readonly dbService: MainDbService) {
    this.collectionName = dbService.collections.customers;
    this.collectionRef = dbService.getCollection(this.collectionName);
  }

  async create(createCustomerDto: CreateCustomerDto) {
    const id = createCustomerDto.dui;
    const payload = {
      ...createCustomerDto,
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
    return `This action returns a #${id} customer`;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const document = await this.dbService.getDocumentById(
      this.collectionName,
      id,
    );
    const result = await this.dbService.update(document, updateCustomerDto);
    return result;
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}
