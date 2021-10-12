import { Module } from '@nestjs/common';
import { CounterLogsService } from './counter-logs.service';
import { CounterLogsController } from './counter-logs.controller';
import { MainDbService } from 'src/common/main-db/main-db.service';

@Module({
  controllers: [CounterLogsController],
  providers: [CounterLogsService, MainDbService],
})
export class CounterLogsModule {}
