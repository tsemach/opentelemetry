import { Injectable } from '@nestjs/common';
import { InjectOtelMetric } from '../opentelemetry/inject-metric.decorator';
import { METRICS } from 'src/common/metrics-consts';
import { Histogram } from '@opentelemetry/api-metrics';

@Injectable()
export class HistogramService {
  constructor(
    @InjectOtelMetric(METRICS.HISTOGRAM_REQUESTS.name)
    private readonly histogram: Histogram,
  ) {}

  async handleRequest() {
    const activeCalled = Math.random() * 5;
    const startTime = new Date().getTime();

    await new Promise((resolve) => setTimeout(resolve, activeCalled));

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;

    this.histogram.record(executionTime * 1000);

    console.log(
      '[HistogramService:handleRequest] histogram value:',
      activeCalled * 1000,
    );
  }
}
