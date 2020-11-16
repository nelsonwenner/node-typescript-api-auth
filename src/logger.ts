import pino from 'pino';
import 'dotenv/config';

export default pino({
  enabled: parseInt(`${process.env.LOGGER_ENABLE}`) ? true : false,
  level: process.env.LOGGER_LEVEL,
});
