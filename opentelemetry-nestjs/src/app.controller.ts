import { Controller, Get } from '@nestjs/common';
import { InjectOtelMetric } from './opentelemetry/inject-metric.decorator';
import { Counter } from '@opentelemetry/api-metrics';
import { METRICS } from './common/metrics-consts';

@Controller('/opentelemetry')
export class AppController {
  constructor(
    @InjectOtelMetric(METRICS.OPENTELEMETRY_REQUESTS.name)
    private readonly requestCounter: Counter,
  ) {}

  @Get()
  handleRequest() {
    this.requestCounter.add(1, { route: '/api' });
    return { message: 'Opentelemetry request received!' };
  }

  @Get('/hello')
  getHello() {
    return 'Hello World!';
  }
}
