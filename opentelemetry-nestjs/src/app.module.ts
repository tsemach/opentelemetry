import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenTelemetryModule } from './opentelemetry/opentelemetry.module';

@Module({
  imports: [OpenTelemetryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
