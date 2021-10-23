import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { InvoiceStatus } from '../entities/invoice.entity';

export class UpdateInvoiceDto {
  @IsEnum(InvoiceStatus)
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    name: 'status',
  })
  status: InvoiceStatus;
}
