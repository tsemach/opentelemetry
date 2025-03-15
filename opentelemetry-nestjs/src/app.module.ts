import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenTelemetryModule } from './opentelemetry/opentelemetry.module';
import { CounterModule } from './counter/counter.module';
import { GaugeModule } from './gauge/gauge.module';

@Module({
  imports: [OpenTelemetryModule, CounterModule, GaugeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
