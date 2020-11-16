import pino from 'pino';
import 'dotenv/config';

export default pino({
  enabled: process.env.LOGGER_ENABLE as unknown as boolean,
  level: process.env.LOGGER_LEVEL,
});
