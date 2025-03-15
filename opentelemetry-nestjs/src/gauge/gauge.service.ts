import { Injectable } from '@nestjs/common';
import { InjectOtelMetric } from '../opentelemetry/inject-metric.decorator';
import { METRICS } from 'src/common/metrics-consts';
import { ObservableResult, ObservableGauge } from '@opentelemetry/api-metrics';

@Injectable()
export class GaugeService {
  private activeCalled = 0;

  constructor(
    @InjectOtelMetric(METRICS.GAUGE_REQUESTS.name)
    private readonly gauge: ObservableGauge,
  ) {
    this.gauge.addCallback((observableResult: ObservableResult) => {
      observableResult.observe(this.activeCalled, {});
    });
  }

  handleRequest() {
    this.activeCalled = Math.random() * 100;
    console.log('[GaugeService:handleRequest] gauge value:', this.activeCalled);
  }
}
