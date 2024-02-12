import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilitamos CORS para pruebas locales
  app.useGlobalPipes(new ValidationPipe()); // Validacion automatica
  await app.listen(3001);
}

bootstrap();
