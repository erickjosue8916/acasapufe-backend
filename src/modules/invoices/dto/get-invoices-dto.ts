import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { InvoiceStatus } from '../entities/invoice.entity';

export class GetInvoiceDto {
  @IsEnum(InvoiceStatus)
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    name: 'status',
    enum: InvoiceStatus,
  })
  status: InvoiceStatus;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    name: 'customerId',
    type: 'string',
    example: '000-000-000',
  })
  customerId: string;
}
