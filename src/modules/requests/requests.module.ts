import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { MainDbService } from 'src/common/main-db/main-db.service';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService, MainDbService],
})
export class RequestsModule {}
