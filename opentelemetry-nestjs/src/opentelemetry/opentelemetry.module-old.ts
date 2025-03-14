import { Module, OnModuleInit } from '@nestjs/common';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

@Module({})
export class OpenTelemetryModule implements OnModuleInit {
  private meterProvider: MeterProvider;

  onModuleInit() {
    // Set up Prometheus Exporter
    const exporter = new PrometheusExporter(
      { port: 9464 }, // Expose metrics at /metrics
      () => {
        console.log(
          'Prometheus scrape endpoint: http://localhost:9464/metrics',
        );
      },
    );

    // Create the MeterProvider with the new "readers" API
    this.meterProvider = new MeterProvider({
      readers: [exporter],
    });

    // Create a meter
    const meter = this.meterProvider.getMeter('nestjs-meter');

    // Define a simple counter metric
    const requestCounter = meter.createCounter('requests_total', {
      description: 'Total number of requests',
    });

    // Expose a method to update the metric
    global['recordRequest'] = () => {
      requestCounter.add(1, { route: '/api' });
    };
  }
}
