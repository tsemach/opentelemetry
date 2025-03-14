import { Module, OnModuleInit } from '@nestjs/common';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { MeterProvider } from '@opentelemetry/sdk-metrics';

const exporter = new PrometheusExporter({ port: 9464 }, () => {
  console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
});

const meterProvider = new MeterProvider({
  readers: [exporter],
});

@Module({
  providers: [
    {
      provide: 'OTEL_METER_PROVIDER',
      useValue: meterProvider,
    },
    {
      provide: 'OTEL_METRIC_requests_total',
      useFactory: (meterProvider: MeterProvider) => {
        const meter = meterProvider.getMeter('nestjs-meter');

        return meter.createCounter('requests_total', {
          description: 'Total number of requests',
        });
      },
      inject: ['OTEL_METER_PROVIDER'],
    },
  ],
  exports: ['OTEL_METRIC_requests_total'],
})
export class OpenTelemetryModule implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    console.log('OpenTelemetry Meter Provider initialized!');
  }
}
