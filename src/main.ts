import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';
import { parse } from 'yaml';
import { LoggingService, writeErrorLogToFile } from './logging';
import { LOG_FILE_NAMES } from 'src/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const PORT = process.env.PORT || 4000;
  const loggingLevel = Number(process.env.LOGGING_LEVEL) || 4;
  const maxFileSize = (Number(process.env.LOG_MAX_FILE_SIZE_KB) || 100) * 1024;

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

  // Initialize custom logging service with specified logging level
  app.useLogger(new LoggingService(loggingLevel));

  await app.listen(PORT);

  console.log(`Server started on port ${PORT}!`);

  process.on('uncaughtException', async (error: Error): Promise<void> => {
    await writeErrorLogToFile(
      error,
      LOG_FILE_NAMES.UNCAUGHT_EXCEPTION,
      maxFileSize,
    );
  });

  process.on('unhandledRejection', async (error: Error): Promise<void> => {
    await writeErrorLogToFile(
      error,
      LOG_FILE_NAMES.UNHANDLED_REJECTION,
      maxFileSize,
    );
  });
}

bootstrap();
