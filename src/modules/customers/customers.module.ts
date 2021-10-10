import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MainDbService } from 'src/common/main-db/main-db.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, MainDbService],
})
export class CustomersModule {}
