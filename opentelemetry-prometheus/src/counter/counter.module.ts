import { Module } from '@nestjs/common';
import {
  PrometheusModule,
  makeCounterProvider,
} from '@willsoto/nestjs-prometheus';
import { CounterService } from './counter.service';
import { METRICS } from 'src/common/metrics-consts';
import { CounterController } from './counter.controller';

@Module({
  imports: [PrometheusModule],
  providers: [
    CounterService,
    makeCounterProvider({
      name: METRICS.COUNTER.name,
      help: METRICS.COUNTER.help,
    }),
  ],
  exports: [CounterService],
  controllers: [CounterController],
})
export class CounterModule {}
