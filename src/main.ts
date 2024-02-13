import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS.split(','), // "http://localhost:3000,https://miapp.com"
    credentials: true,
  });

  await app.init();
  return server;
}

const serverPromise = bootstrap();

export { serverPromise as server };
