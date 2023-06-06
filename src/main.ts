import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { hbsConfig } from '../hbs-config'
import startUpSocket from './sockets/startup';

function formatMemoryUsage(memoryUsage: NodeJS.MemoryUsage): NodeJS.MemoryUsage {
  const formattedMemoryUsage: NodeJS.MemoryUsage = {} as NodeJS.MemoryUsage;
  const bytesInMegabytes = 1024 * 1024;

  for (const key in memoryUsage) {
    if (memoryUsage.hasOwnProperty(key)) {
      formattedMemoryUsage[key] = (memoryUsage[key] / bytesInMegabytes).toFixed(2);
    }
  }

  return formattedMemoryUsage;
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  startUpSocket()

  app.enableCors();

  hbsConfig(app)

  console.log(formatMemoryUsage(process.memoryUsage()))

  await app.listen(process.env.PORT || 3001);

}
bootstrap();


