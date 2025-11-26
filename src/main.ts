/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global validation
  app.useGlobalPipes(new ValidationPipe());

  // cors
  app.enableCors();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
