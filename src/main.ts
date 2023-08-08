import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;

  // Load API documentation from file
  const docPath = resolve(cwd(), 'doc', 'api.yaml');
  const docContent = await readFile(docPath, { encoding: 'utf8' });
  const swaggerDocument = parse(docContent);

  // Set up Swagger documentation using the parsed YAML content
  SwaggerModule.setup('doc', app, swaggerDocument);

  // Apply global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: true }),
  );

  await app.listen(PORT);

  console.log(`Server started on port ${PORT}!`);
}

bootstrap();
