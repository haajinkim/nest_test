import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataCollectorService } from './module/data.collector/data.collector.service';

const logger = new Logger('bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;

  const dataSaver = app.get(DataCollectorService);
  await dataSaver.findAll();

  await app.listen(port);

  logger.log(`* listening on port ${port} *`);
}

bootstrap();
