import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ISSUE_STATUS } from './entities/issue.entity';

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
      status: ISSUE_STATUS.PENDING,
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
    const query = await this.collectionRef.doc(id).get();
    const result = await this.dbService.getDataFromDocument(query);
    return result;
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
