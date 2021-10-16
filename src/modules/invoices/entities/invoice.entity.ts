export enum InvoiceStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

export class Invoice {
  id: string;
  customerId: string;
  amount: number;
  status: InvoiceStatus;
  createdAt: string;
}
