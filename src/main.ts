import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { hbsConfig } from '../hbsConfig'
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter)

  hbsConfig(app)

  await app.listen(process.env.PORT || 3001);

}
bootstrap();


