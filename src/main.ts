import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataCollectorService } from './module/data.collector/data.collector.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;

  const dataSaver = app.get(DataCollectorService)
  await dataSaver.findAll()
  await app.listen(port);
  console.log(`
    **************************
    * listening on port ${port} *
    **************************`);
}
bootstrap();
