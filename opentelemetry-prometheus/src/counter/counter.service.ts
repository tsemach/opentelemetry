import { Injectable } from '@nestjs/common';
import { Counter } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { METRICS } from 'src/common/metrics-consts';

@Injectable()
export class CounterService {
  constructor(
    @InjectMetric(METRICS.COUNTER.name)
    private readonly counter: Counter,
  ) {}

  handleRequest() {
    this.counter.inc();

    console.log('[CounterService:handleRequest] counter value:');
  }

  async getCounterValue() {
    return await this.counter.get();
  }
}
