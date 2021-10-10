import { Module } from '@nestjs/common';
import { CounterLogsService } from './counter-logs.service';
import { CounterLogsController } from './counter-logs.controller';

@Module({
  controllers: [CounterLogsController],
  providers: [CounterLogsService],
})
export class CounterLogsModule {}
