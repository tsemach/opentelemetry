import { Module, OnModuleInit } from '@nestjs/common';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { OpenTelemetryModule } from 'src/opentelemetry/opentelemetry.module';
import { GaugeController } from './gauge.controller';
import { GaugeService } from './gauge.service';
import { METRICS } from 'src/common/metrics-consts';

@Module({
  imports: [OpenTelemetryModule],
  providers: [
    {
      provide: `OTEL_METRIC_${METRICS.GAUGE_REQUESTS.name}`,
      useFactory: (meterProvider: MeterProvider) => {
        const meter = meterProvider.getMeter('nestjs-gauge-meter');

        return meter.createObservableGauge(METRICS.GAUGE_REQUESTS.name, {
          description: METRICS.GAUGE_REQUESTS.help,
        });
      },
      inject: ['OTEL_METER_PROVIDER'],
    },
    GaugeService,
  ],
  controllers: [GaugeController],
  exports: [`OTEL_METRIC_${METRICS.GAUGE_REQUESTS.name}`],
})
export class GaugeModule implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    console.log('GaugeModule Meter Provider initialized!');
  }
}
