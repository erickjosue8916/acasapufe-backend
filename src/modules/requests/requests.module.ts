import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CustomersModule } from '../customers/customers.module';
import { CustomersService } from '../customers/customers.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [CustomersModule, UsersModule],
  controllers: [RequestsController],
  providers: [RequestsService, MainDbService, CustomersService, UsersService],
})
export class RequestsModule {}
