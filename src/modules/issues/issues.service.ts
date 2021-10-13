import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Injectable()
export class IssuesService {
  private collectionName: string;
  private collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(private readonly dbService: MainDbService) {
    this.collectionName = dbService.collections.issues;
    this.collectionRef = dbService.getCollection(this.collectionName);
  }

  async create(createIssueDto: CreateIssueDto) {
    const payload = {
      ...createIssueDto,
      isResolved: false,
      createAt: dayjs().format(),
    };
    const result = await this.dbService.createDocument<any>(
      this.collectionName,
      payload,
    );
    const id = result.id;
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

  async findOne(id: string) {
    return `This action returns a #${id} issue`;
  }

  async update(id: string, updateIssueDto: UpdateIssueDto) {
    const document = await this.dbService.getDocumentById(
      this.collectionName,
      id,
    );
    const result = await this.dbService.update(document, updateIssueDto);
    return result;
  }

  async remove(id: string) {
    return `This action removes a #${id} issue`;
  }
}
