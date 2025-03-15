import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenTelemetryModule } from './opentelemetry/opentelemetry.module';
import { CounterModule } from './counter/counter.module';

@Module({
  imports: [OpenTelemetryModule, CounterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
