import { Injectable } from '@nestjs/common';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { GetInvoiceDto } from './dto/get-invoices-dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  private collectionName: string;
  private collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(private readonly dbService: MainDbService) {
    this.collectionName = dbService.collections.invoices;
    this.collectionRef = dbService.getCollection(this.collectionName);
  }
  async create(createInvoiceDto: CreateInvoiceDto) {
    const invoice = new Invoice(createInvoiceDto);

    const invoiceData = invoice.toJson();
    const invoiceCreated = await this.dbService.createDocument(
      this.collectionName,
      invoiceData,
    );

    const item = await invoiceCreated.get();
    const result = {
      id: item.id,
      ...item.data(),
    };
    return result;
  }

  async findAll(query: GetInvoiceDto) {
    const prepareQuery = this.collectionRef;
    if (query.customerId)
      prepareQuery.where('customerId', '==', query.customerId);
    if (query.status) prepareQuery.where('status', '==', query.status);
    prepareQuery.orderBy('createdAt', 'desc');

    const response = await prepareQuery.get();
    const items = this.dbService.parseFirestoreItemsResponse(response);
    return items;
  }

  async findOne(id: string) {
    const query = await this.collectionRef.doc(id).get();
    const result = await this.dbService.getDataFromDocument(query);
    return result;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const document = await this.dbService.getDocumentById(
      this.collectionName,
      id,
    );

    const result = await this.dbService.update(document, updateInvoiceDto);
    return result;
  }

  async remove(id: string) {
    return `This action removes a #${id} invoice`;
  }
}
