import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { appendOrRotateLog } from './logging.utils';
import { ERROR_MESSAGES, LOG_FILE_NAMES } from 'src/constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logFileName: string = LOG_FILE_NAMES.ERROR;

  constructor(private readonly configService: ConfigService) {}

  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const maxFileSize: number =
      Number(this.configService.get('LOG_MAX_FILE_SIZE_KB') || 100) * 1024;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage =
      exception instanceof HttpException
        ? (exception.getResponse() as any)?.error || exception.message
        : ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

    const logData: string = `
Timestamp: ${new Date().toISOString()}
Method: ${request.method}
URL: ${request.url}
Status Code: ${status}
Error message: ${errorMessage}
`;

    // Append or rotate the log file with the generated log data
    await appendOrRotateLog(this.logFileName, logData, maxFileSize);

    // Return standardized JSON response
    sendJsonResponse(
      response,
      status,
      errorMessage,
      request.method,
      request.url,
    );
  }
}

function sendJsonResponse(
  response: Response,
  status: number,
  errorMessage: string,
  method: string,
  url: string,
): void {
  response.status(status).json({
    timestamp: new Date().toISOString(),
    method: method,
    path: url,
    statusCode: status,
    error: errorMessage,
  });
}
