import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@Injectable()
export class ValidationCustomerDuiDuplicatedPipe implements PipeTransform {
  private collectionName: string;
  private collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(private readonly dbService: MainDbService) {
    this.collectionName = this.dbService.collections.customers;
    this.collectionRef = this.dbService.getCollection(this.collectionName);
  }

  async transform(
    customerData: CreateCustomerDto,
    { metatype }: ArgumentMetadata,
  ) {
    const queryResult = await this.collectionRef
      .where('dui', '==', customerData.dui)
      .get();
    const items = await this.dbService.parseFirestoreItemsResponse(queryResult);
    if (items.length) {
      throw new HttpException(
        `Dui already registered for a customer`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return customerData;
  }
}
