import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  app.connectMicroservice(Config.kafka.connection());
  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
