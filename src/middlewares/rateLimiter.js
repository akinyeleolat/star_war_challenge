import rateLimit from 'express-rate-limit';

/*
  Simple naive rate limiting implementation
*/
export default rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
});
