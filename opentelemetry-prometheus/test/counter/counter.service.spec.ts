import { Test, TestingModule } from '@nestjs/testing';
import { CounterService } from 'src/counter/counter.service';

describe('test counter service', () => {
  let service: CounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CounterService],
    }).compile();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
    service = module.get<CounterService>(CounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
