import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { MainDbService } from 'src/common/main-db/main-db.service';

@Injectable()
export class RequestByIdPipe implements PipeTransform {
  private collectionName: string;
  private collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(private readonly dbService: MainDbService) {
    this.collectionName = this.dbService.collections.requests;
    this.collectionRef = this.dbService.getCollection(this.collectionName);
  }

  async transform(id: string, { metatype }: ArgumentMetadata) {
    const request = await this.collectionRef.doc(id).get();
    if (!request.exists) {
      throw new HttpException(`Request not found`, HttpStatus.NOT_FOUND);
    }
    return request;
  }
}
