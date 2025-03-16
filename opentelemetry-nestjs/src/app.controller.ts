import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { InjectOtelMetric } from './opentelemetry/inject-metric.decorator';
import { Counter } from '@opentelemetry/api-metrics';
import { METRICS } from './common/metrics-consts';
import { Config } from './config';

@Controller('/opentelemetry')
export class AppController {
  constructor(
    @Inject(Config.kafka.name) private readonly kafkaClient: ClientKafka,
    @InjectOtelMetric(METRICS.OPENTELEMETRY_REQUESTS.name)
    private readonly requestCounter: Counter,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  @Get()
  handleRequest() {
    this.requestCounter.add(1, { route: '/api' });
    return { message: 'Opentelemetry request received!' };
  }

  @Get('metrics')
  sendMessage() {
    this.kafkaClient
      .emit(Config.kafka.topic, 'metrics are avaliable')
      .subscribe();

    return { message: 'Metrics sent to Kafka!' };
  }

  @EventPattern(Config.kafka.topic)
  // eslint-disable-next-line @typescript-eslint/require-await
  async handleUserCreated(data: Record<string, unknown>) {
    console.log(data);
  }

  @Get('/hello')
  getHello() {
    return 'Hello World!';
  }
}
