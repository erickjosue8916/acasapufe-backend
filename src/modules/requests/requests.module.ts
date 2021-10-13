import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CustomersModule } from '../customers/customers.module';
import { CustomersService } from '../customers/customers.service';

@Module({
  imports: [CustomersModule],
  controllers: [RequestsController],
  providers: [RequestsService, MainDbService, CustomersService],
})
export class RequestsModule {}
