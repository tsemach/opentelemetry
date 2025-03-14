/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Provider } from '@nestjs/common';
import { Meter } from '@opentelemetry/api-metrics';
import { Counter, metrics } from '@opentelemetry/api';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

/**
 * Creates a list of metric providers.
 */
export const OpenTelemetryMetricsProviders: Provider[] = [
  {
    provide: 'OTEL_METER',
    useValue: metrics.getMeterProvider().getMeter('nestjs-meter'),
  },
  {
    provide: 'OTEL_METRIC_requests_total',
    useFactory: (meter: Meter): Counter => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return meter.createCounter('requests_total', {
        description: 'Total number of requests',
      }) as Counter;
    },
    inject: ['OTEL_METER'],
  },
  {
    provide: 'OTEL_METRICS_EXPORTER',
    useFactory: () => {
      // Create a Prometheus Exporter
      const exporter = new PrometheusExporter(
        { port: 9464 }, // Default Prometheus scrape port
        () => {
          console.log(
            'Prometheus scrape endpoint: http://localhost:9464/metrics',
          );
        },
      );

      // Create a MeterProvider with the Prometheus exporter
      const meterProvider = new MeterProvider({
        readers: [exporter], // Register Prometheus exporter as a reader
      });

      return meterProvider;
    },
  },
];
