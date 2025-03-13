import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule } from './prometheus/prometheus.module';
import { CounterModule } from './counter/counter.module';

@Module({
  imports: [PrometheusModule, CounterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
