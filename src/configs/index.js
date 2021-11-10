import dotenv from 'dotenv';

dotenv.config();

const config = {
  dev_db_Url: process.env.DATABASE_URL_DEVELOPMENT,
  db_Url: process.env.DATABASE_URL,
  port: process.env.PORT || 8000,
  env: process.env.NODE_ENV || 'development',
  logDir: process.env.LOGDIR || 'logs',
  tokenExpiry: process.env.TOKEN_EXPIRY,
  secret: process.env.SECRET,
  enableCircuitBreaker: process.env.ENABLE_CIRCUIT_BREAKER || 1,
  circuitBreakerDelay: process.env.CIRCUIT_BREAKER_DELAY || 25,
  environment: process.env.NODE_ENV || 'development',
};
export default config;
