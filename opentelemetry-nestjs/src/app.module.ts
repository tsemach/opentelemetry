import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenTelemetryModule } from './opentelemetry/opentelemetry.module';
import { CounterModule } from './counter/counter.module';
import { GaugeModule } from './gauge/gauge.module';
import { Config } from './config';

@Module({
  imports: [
    // ClientsModule.register([Config.kafka.register()]),
    ClientsModule.register([
      {
        name: Config.kafka.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: Config.kafka.brokers,
            clientId: Config.kafka.clientId,
          },
          consumer: {
            groupId: Config.kafka.groupId,
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
    OpenTelemetryModule,
    CounterModule,
    GaugeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
