import { Test, TestingModule } from '@nestjs/testing';
import { CounterLogsController } from './counter-logs.controller';
import { CounterLogsService } from './counter-logs.service';

describe('CounterLogsController', () => {
  let controller: CounterLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CounterLogsController],
      providers: [CounterLogsService],
    }).compile();

    controller = module.get<CounterLogsController>(CounterLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
