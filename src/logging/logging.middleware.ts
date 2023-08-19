import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { appendOrRotateLog } from './logging.utils';
import { LOG_FILE_NAMES } from 'src/constants';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private httpLogger: Logger = new Logger('HTTP');
  private logFileName: string = LOG_FILE_NAMES.HTTP;

  constructor(private readonly configService: ConfigService) {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { body, method, originalUrl, params } = request;
    const maxFileSize: number =
      Number(this.configService.get('LOG_MAX_FILE_SIZE_KB') || 100) * 1024;

    // Subscribe to the 'finish' event to perform logging after the response is completed
    response.on('finish', async (): Promise<void> => {
      const logData: string = `
Timestamp: ${new Date().toISOString()}
Incoming Request:
  Method: ${method}
  URL: ${originalUrl}
  Query Parameters: ${JSON.stringify(params)}
  Body: ${JSON.stringify(body)}
Response:
  Status Code: ${response.statusCode}
  Status Message: ${response.statusMessage}
`;

      // Log the request and response data using the HTTP logger
      this.httpLogger.log(logData);

      // Append or rotate the log file with the generated log data
      await appendOrRotateLog(this.logFileName, logData, maxFileSize);
    });

    // Pass control to the next handler in the chain
    next();
  }
}
