import { Module, OnModuleInit } from '@nestjs/common';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { MeterProvider } from '@opentelemetry/sdk-metrics-base';
import { metrics } from '@opentelemetry/api';

// Create a Prometheus Exporter
const exporter = new PrometheusExporter({ port: 9464 }, () => {
  console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
});

// Create a MeterProvider with the Prometheus exporter
const meterProvider = new MeterProvider({
  readers: [exporter], // Register Prometheus exporter as a reader
});

@Module({
  providers: [
    {
      provide: 'OTEL_METER_PROVIDER',
      useValue: meterProvider, // Provide the MeterProvider
    },
    {
      provide: 'OTEL_METRIC_requests_total',
      useFactory: (meterProvider: MeterProvider) => {
        const meter = meterProvider.getMeter('nestjs-meter');
        // Create a counter for the 'requests_total' metric
        return meter.createCounter('requests_total', {
          description: 'Total number of requests',
        });
      },
      inject: ['OTEL_METER_PROVIDER'], // Inject MeterProvider here
    },
  ],
})
export class OpenTelemetryModule implements OnModuleInit {
  constructor() {}

  // NestJS lifecycle hook to ensure meter provider is initialized
  onModuleInit() {
    console.log('OpenTelemetry Meter Provider initialized!');
  }
}
