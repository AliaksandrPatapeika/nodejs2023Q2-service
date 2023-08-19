import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const logData: string = `
    statusCode: ${status}
    method: ${request.method}
    path: ${request.url}
    `;

    console.log('LOG_TEST_ERROR_TMP', logData);

    response.status(status).json({
      statusCode: status,
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
