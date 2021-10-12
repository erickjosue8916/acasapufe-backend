import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { MainDbService } from 'src/common/main-db/main-db.service';

@Module({
  controllers: [IssuesController],
  providers: [IssuesService, MainDbService],
})
export class IssuesModule {}
