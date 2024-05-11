// morganConfig.ts
import morgan, { StreamOptions } from 'morgan';
import { logger } from '../config/logger';

// Stream configuration for morgan
const stream: StreamOptions = {
  write: (message) => {
    // Strip ANSI color codes
    // eslint-disable-next-line no-control-regex
    const cleanMessage = message.replace(/\u001B\[\d+m/g, '');
    logger.http(cleanMessage.trim());
  },
};

export const requestLoggerMiddleware = morgan(
  // Define log format
  ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  { stream }
);
