const { circuitBreakerDelay: delay, enableCircuitBreaker } = require('../configs');

const noOp = () => {};
/**
 *  circuit breaker
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} null
 */
const circuitBreaker = (req, res, next) => {
  if (enableCircuitBreaker) {
    // Delay for 25 seconds before breaking request
    const circuitBreakerDelay = Number(delay) || 25;

    setTimeout(() => {
      if (!res.headersSent) {
        res.status(503).json({
          status: 'retry',
          message: 'Service timeout',
        });

        /**
           * Set these to noOp (no operation)
           * to prevent getting headers already sent error
           */
        res.send = noOp;
        res.json = noOp;
        res.render = noOp;
      }
    }, circuitBreakerDelay * 1000);
  }
  next();
};

export default circuitBreaker;
