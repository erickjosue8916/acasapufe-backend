import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { MainDbService } from 'src/common/main-db/main-db.service';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, MainDbService],
})
export class InvoicesModule {}
