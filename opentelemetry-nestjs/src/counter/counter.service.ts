import { Injectable } from '@nestjs/common';
import { InjectOtelMetric } from '../opentelemetry/inject-metric.decorator';
import { Counter } from '@opentelemetry/api-metrics';
import { METRICS } from 'src/common/metrics-consts';

@Injectable()
export class CounterService {
  constructor(
    @InjectOtelMetric(METRICS.COUNTER_REQUESTS.name)
    private readonly counter: Counter,
  ) {}

  handleRequest(route: string) {
    this.counter.add(1, { route });

    console.log('[CounterService:handleRequest] counter value:');
  }
}
