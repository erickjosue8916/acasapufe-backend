import { Test, TestingModule } from '@nestjs/testing';
import { MainDbService } from './main-db.service';

describe('MainDbService', () => {
  let service: MainDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainDbService],
    }).compile();

    service = module.get<MainDbService>(MainDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
