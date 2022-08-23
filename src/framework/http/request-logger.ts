import logger from '@app/common/logger';
import expressWinston from 'express-winston';

export const requestLogger = expressWinston.logger({
  winstonInstance: logger,
});

export const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
});
