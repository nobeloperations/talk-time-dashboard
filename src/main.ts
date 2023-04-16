import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { hbsConfig } from '../hbs-config'
import startUpSocket from './sockets/startup';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  startUpSocket()

  app.enableCors();

  hbsConfig(app)

  await app.listen(process.env.PORT || 3001);

}
bootstrap();


