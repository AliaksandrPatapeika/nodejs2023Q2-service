import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';
import { LOGGING_LEVELS } from 'src/constants';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  constructor(loggingLevel: number) {
    super();
    super.setLogLevels(
      (LOGGING_LEVELS as LogLevel[]).slice(0, loggingLevel + 1),
    );
  }

  error(message: any, ...optionalParams: [...any, string?, string?]): void {
    super.error(message, ...optionalParams);
  }
}
