import { Test, TestingModule } from '@nestjs/testing';
import { CounterLogsService } from './counter-logs.service';

describe('CounterLogsService', () => {
  let service: CounterLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CounterLogsService],
    }).compile();

    service = module.get<CounterLogsService>(CounterLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
