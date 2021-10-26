import { Injectable } from '@nestjs/common';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { GetInvoiceDto } from './dto/get-invoices-dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  private collectionName: string;
  private customerCollection: string;
  private collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(private readonly dbService: MainDbService) {
    this.collectionName = dbService.collections.invoices;
    this.customerCollection = dbService.collections.customers;
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
    let response;
    let customer;
    if (query.customerId && query.status) {
      response = await prepareQuery
        .where('customerId', '==', query.customerId)
        .where('status', '==', query.status)
        .orderBy('createdAt', 'desc')
        .get();
    } else if (query.status) {
      response = await prepareQuery
        .where('status', '==', query.status)
        .orderBy('createdAt', 'desc')
        .get();
    } else {
      response = await prepareQuery
        .where('customerId', '==', query.customerId)
        .orderBy('createdAt', 'desc')
        .get();
    }

    if (query.customerId) {
      const customerRequest = await this.dbService
        .getCollection(this.customerCollection)
        .doc(query.customerId)
        .get();
      customer = this.dbService.getDataFromDocument(customerRequest);
    }

    const items = await this.dbService.parseFirestoreItemsResponse(response);
    if (customer) {
      return items.map((item) => {
        return {
          ...item,
          customer,
        };
      });
    }
    return items;
  }

  async findOne(id: string) {
    const query = await this.collectionRef.doc(id).get();
    const result = await this.dbService.getDataFromDocument(query);

    const customer = await this.dbService
      .getCollection(this.customerCollection)
      .doc(result.customerId)
      .get();
    const customerData = this.dbService.getDataFromDocument(customer);
    return { ...result, customer: customerData };
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
