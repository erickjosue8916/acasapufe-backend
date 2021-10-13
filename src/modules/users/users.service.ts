import { Injectable } from '@nestjs/common';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private collectionName: string;
  private collectionRef;

  constructor(private readonly dbService: MainDbService) {
    this.collectionName = dbService.collections.users;
    this.collectionRef = dbService.getCollection(this.collectionName);
  }

  async create(createUserDto: CreateUserDto) {
    const result = await this.dbService.createDocument<any>(
      this.collectionName,
      createUserDto,
    );
    const doc = await result.get();
    const data = this.dbService.getDataFromDocument(doc);
    return data;
  }

  async findAll() {
    const result = await this.collectionRef.get();
    const items = await this.dbService.parseFirestoreItemsResponse(result);
    return items;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
