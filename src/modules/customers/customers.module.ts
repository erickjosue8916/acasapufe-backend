import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MainDbService } from 'src/common/main-db/main-db.service';
import { CounterLogsModule } from '../counter-logs/counter-logs.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [CounterLogsModule, UsersModule],
  controllers: [CustomersController],
  providers: [CustomersService, MainDbService, UsersService],
})
export class CustomersModule {}
