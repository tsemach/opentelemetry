import { Module, OnModuleInit } from '@nestjs/common';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { OpenTelemetryModule } from 'src/opentelemetry/opentelemetry.module';
import { HistogramController } from './histogram.controller';
import { HistogramService } from './histogram.service';
import { METRICS } from 'src/common/metrics-consts';

@Module({
  imports: [OpenTelemetryModule],
  providers: [
    {
      provide: `OTEL_METRIC_${METRICS.HISTOGRAM_REQUESTS.name}`,
      useFactory: (meterProvider: MeterProvider) => {
        const meter = meterProvider.getMeter('nestjs-hisogram-meter');

        return meter.createHistogram(METRICS.HISTOGRAM_REQUESTS.name, {
          description: METRICS.HISTOGRAM_REQUESTS.help,
        });
      },
      inject: ['OTEL_METER_PROVIDER'],
    },
    HistogramService,
  ],
  controllers: [HistogramController],
  exports: [`OTEL_METRIC_${METRICS.HISTOGRAM_REQUESTS.name}`],
})
export class HistogramModule implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    console.log('HistogramModule Meter Provider initialized!');
  }
}
