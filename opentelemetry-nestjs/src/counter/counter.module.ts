import { Module, OnModuleInit } from '@nestjs/common';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { OpenTelemetryModule } from 'src/opentelemetry/opentelemetry.module';
import { CounterController } from './counter.controller';
import { CounterService } from './counter.service';
import { METRICS } from 'src/common/metrics-consts';

@Module({
  imports: [OpenTelemetryModule],
  providers: [
    {
      provide: `OTEL_METRIC_${METRICS.COUNTER_REQUESTS.name}`,
      useFactory: (meterProvider: MeterProvider) => {
        const meter = meterProvider.getMeter('nestjs-meter');

        return meter.createCounter(METRICS.COUNTER_REQUESTS.name, {
          description: 'Count total number of requests',
        });
      },
      inject: ['OTEL_METER_PROVIDER'],
    },
    CounterService,
  ],
  controllers: [CounterController],
  exports: [`OTEL_METRIC_${METRICS.COUNTER_REQUESTS.name}`],
})
export class CounterModule implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    console.log('CounterModule Meter Provider initialized!');
  }
}
