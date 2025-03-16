import { Transport } from '@nestjs/microservices';
import { KafkaOptions } from '@nestjs/microservices';

export class ConfigKafka {
  readonly brokers: string[];
  readonly name: string = 'KAFKA';
  readonly topic: string = 'metrics.exporter.topic';
  readonly groupId: string = 'metrics.exporter.groupid';
  readonly clientId: string = 'metrics.exporter.clientid';

  constructor() {
    this.brokers = this.getKafkaHost();
  }

  connection(): any {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: this.brokers,
        },
      },
    };
  }

  register(): { name: string } & KafkaOptions {
    return {
      name: this.name,
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.clientId,
          brokers: this.brokers,
        },
        consumer: {
          groupId: this.groupId,
          allowAutoTopicCreation: true,
        },
      },
    };
  }

  private getKafkaHost() {
    if (process.env.KAFKA_HOST) {
      return process.env.KAFKA_HOST.split(',');
    }

    return ['localhost:19092', 'localhost:29092', 'localhost:39092'];
  }
}
