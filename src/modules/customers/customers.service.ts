import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { query } from 'express';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CreateCounterLogDto } from '../counter-logs/dto/create-counter-log.dto';
import { GetInvoiceDto } from '../invoices/dto/get-invoices-dto';
import { Invoice, InvoiceStatus } from '../invoices/entities/invoice.entity';
import { InvoicesService } from '../invoices/invoices.service';
import { CreateIssueDto } from '../issues/dto/create-issue.dto';
import { ISSUE_STATUS } from '../issues/entities/issue.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserTypes } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  private collectionName: string;
  private collectionCounterLogs: string;
  private collectionIssues: string;
  private collectionInvoices: string;
  private collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(
    private readonly dbService: MainDbService,
    private readonly usersService: UsersService,
    private readonly invoicesService: InvoicesService,
  ) {
    this.collectionName = dbService.collections.customers;
    this.collectionCounterLogs = dbService.collections.customers;
    this.collectionIssues = dbService.collections.issues;
    this.collectionInvoices = dbService.collections.issues;
    this.collectionRef = dbService.getCollection(this.collectionName);
  }

  async create(createCustomerDto: CreateCustomerDto) {
    const id = createCustomerDto.dui;
    const payload = {
      ...createCustomerDto,
      totalCount: 0,
      count: 0,
      monthlyCapturePending: true,
      lastUpdate: dayjs().format(),
      createAt: dayjs().format(),
    };
    const result = await this.dbService.createDocumentWithCustomId<any>(
      this.collectionName,
      id,
      payload,
    );

    const customerUser: CreateUserDto = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      type: UserTypes.Customer,
      dui: payload.dui,
      username: payload.dui,
      password: payload.dui,
      birthDate: '',
    };

    await this.usersService.create(customerUser);
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

  async getPending() {
    const result = await this.collectionRef
      .where('monthlyCapturePending', '==', true)
      .get();
    const items = await this.dbService.parseFirestoreItemsResponse(result);
    const data = items.map((item) => {
      delete item.dui;
      delete item.createAt;
      return item;
    });
    return { data };
  }

  async findOne(id: string) {
    const query = await this.collectionRef.doc(id).get();
    const result = await this.dbService.getDataFromDocument(query);
    return result;
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

  async createCounterLog(
    customer: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
    log: CreateCounterLogDto,
  ) {
    const customerId = customer.id;
    const customerData = customer.data();
    const collectionPath = `${this.collectionName}/${customerId}/${this.collectionCounterLogs}`;
    const currentDate = dayjs().format('YYYY-MM-DD');

    if (log.count < customerData.totalCount) {
      throw new HttpException(
        `Impossible count!!! counter log is minor than current counter`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const totalFacture = log.count - customerData.totalCount;
    const newLog = await this.dbService.createDocumentWithCustomId(
      collectionPath,
      currentDate,
      {
        customerId,
        date: currentDate,
        count: log.count,
      },
    );
    const customerUpdatePayload = {
      totalCount: log.count,
      count: totalFacture,
      lastUpdate: dayjs().format(),
      monthlyCapturePending: false,
    };

    const invoice = await this.invoicesService.create({
      customerId,
      consumeCount: totalFacture,
    });

    const customerRef = await this.collectionRef.doc(customer.id);
    this.dbService.update(customerRef, customerUpdatePayload);
    const customerWithDataUpdated = Object.assign(
      customer.data(),
      customerUpdatePayload,
    );
    return customerWithDataUpdated;
  }

  async getCounterLogs(
    customer: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
  ) {
    const collectionPath = `${this.collectionName}/${customer.id}/${this.collectionCounterLogs}`;
    const result = await this.dbService.getCollection(collectionPath).get();
    const items = this.dbService.parseFirestoreItemsResponse(result);
    return items;
  }

  async createIssue(
    customer: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
    data: CreateIssueDto,
  ) {
    const customerId = customer.id;
    const currentDate = dayjs().format('YYYY-MM-DD');
    const payload = {
      customerId,
      ...data,
      createAt: currentDate,
      status: ISSUE_STATUS.PENDING,
    };
    const newIssue = await this.dbService.createDocument(
      this.collectionIssues,
      payload,
    );
    const result = {
      id: newIssue.id,
      ...payload,
    };
    return result;
  }

  async getIssues(
    customer: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
  ) {
    const response = await this.dbService
      .getCollection(this.collectionIssues)
      .where('customerId', '==', customer.id)
      .get();
    const items = this.dbService.parseFirestoreItemsResponse(response);
    return items;
  }

  async getInvoices(
    customer: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
    query: GetInvoiceDto,
  ) {
    query.customerId = customer.id;
    const items = await this.invoicesService.findAll(query);
    return items;
  }
}
