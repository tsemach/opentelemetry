import { Module } from '@nestjs/common';
import { PrometheusModule as Prometheus } from '@willsoto/nestjs-prometheus';
import { prometheusOptions } from './prometheus-options';

@Module({
  imports: [Prometheus.register(prometheusOptions)],
})
export class PrometheusModule {}
