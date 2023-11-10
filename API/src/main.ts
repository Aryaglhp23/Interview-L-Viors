/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
  };
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
