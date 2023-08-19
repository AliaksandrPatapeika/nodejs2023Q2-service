import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor() {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { body, ip, method, originalUrl, params, query, url } = request;

    // Subscribe to the 'finish' event to perform logging after the response is completed
    response.on('finish', async (): Promise<void> => {
      const logData: string = `
      statusCode: ${response.statusCode}
      statusMessage: ${response.statusMessage}
      body: ${JSON.stringify(body)}
      ip: ${ip}
      method: ${method}
      originalUrl: ${originalUrl}
      params: ${JSON.stringify(params)}
      query: ${JSON.stringify(query)}
      url: ${url}
      `;

      console.log('LOG_TEST', logData);
    });

    // Pass control to the next handler in the chain
    next();
  }
}
