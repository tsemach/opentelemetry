import { Controller, Get } from '@nestjs/common';
import { InjectOtelMetric } from './opentelemetry/inject-metric.decorator';
import { Counter } from '@opentelemetry/api-metrics';

@Controller()
export class AppController {
  constructor(
    @InjectOtelMetric('requests_total')
    private readonly requestCounter: Counter,
  ) {}

  @Get()
  handleRequest() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.requestCounter.add(1, { route: '/api' });
    return { message: 'Request received!' };
  }

  @Get('/hello')
  getHello() {
    return 'Hello World!';
  }
}
