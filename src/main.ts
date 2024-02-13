import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors(); // Habilitamos CORS para pruebas locales
  app.useGlobalPipes(new ValidationPipe()); // Validacion automatica
  await app.listen(3001);
}

bootstrap();

export { server };
