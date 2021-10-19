import * as dayjs from 'dayjs';
import { round } from 'src/core/utils/math';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';

export enum InvoiceStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

export enum Currencies {
  USD = 'usd',
}

export enum Units {
  MTR_3 = 'metro cubico',
}

export class Invoice {
  id: string;
  customerId: string;
  consumeCount: number;
  total: number;
  status: InvoiceStatus;
  pricePerUnit = 8.25;
  priceValue = 15;
  unit: Units = Units.MTR_3;
  paidDate: string;
  createdAt: string;
  currency: Currencies = Currencies.USD;

  constructor(payload: CreateInvoiceDto) {
    const now = dayjs().format();
    this.customerId = payload.customerId;
    this.consumeCount = payload.consumeCount;
    this.status = InvoiceStatus.PENDING;
    this.total = this.createInvoiceAmount(payload.consumeCount);
    this.createdAt = now;
    this.paidDate = '';
  }

  private createInvoiceAmount(consumeCount: number): number {
    const multiplier = round(consumeCount / this.priceValue, 2);
    const invoiceAmount = round(multiplier * this.pricePerUnit, 2);
    return invoiceAmount;
  }

  public toJson(excludeId = true) {
    const result = {
      id: this.id,
      customerId: this.customerId,
      consumeCount: this.consumeCount,
      total: this.total,
      status: this.status,
      pricePerUnit: this.pricePerUnit,
      priceValue: this.priceValue,
      unit: this.unit,
      paidDate: this.paidDate,
      createdAt: this.createdAt,
      currency: this.currency,
    };

    if (excludeId) {
      delete result.id;
    }
    return result;
  }
}
