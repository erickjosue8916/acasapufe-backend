import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { MainDbService } from 'src/common/main-db/main-db.service';

@Injectable()
export class CustomerByIdPipe implements PipeTransform {
  private collectionName: string;
  private collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(private readonly dbService: MainDbService) {
    this.collectionName = this.dbService.collections.customers;
    this.collectionRef = this.dbService.getCollection(this.collectionName);
  }

  async transform(
    customerId: string,
    { metatype }: ArgumentMetadata,
  ): Promise<
    FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  > {
    const customer = await this.collectionRef.doc(customerId).get();
    const data = await this.dbService.getDataFromDocument(customer);
    if (!customer.exists) {
      throw new HttpException(`Customer not found`, HttpStatus.NOT_FOUND);
    }
    return customer;
  }
}
