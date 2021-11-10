/* eslint-disable valid-jsdoc */
import { urlencoded, json } from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import config from '../configs';
import routes from '../routes';
import logger from '../services/Logger';
import circuitBreaker from '../middlewares/circuitBreaker';
import rateLimiter from '../middlewares/rateLimiter';

/**
 * Application loader
 */
class ExpressLoader {
  /**
     * constructor
     */
  constructor() {
    const app = express();


    // Set up middleware
    app.use(morgan('dev'));
    app.use(urlencoded({
      extended: false,
      limit: '20mb'
    }));
    app.use(json({ limit: '20mb' }));

    if (config.environment === 'production') {
      app.use(helmet());
      app.use(compression());
    }

    app.use(rateLimiter);


    // Handle cases where invalid JSON data is passed
    app.use((err, req, res, next) => {
      if (err.type === 'entity.parse.failed') {
        res.json({
          status: 'error',
          message: 'invalid JSON  passed',
        });
      } else {
        next();
      }
    });

    // circuit breaker for Requests that take longer than 25 secs
    app.use(circuitBreaker);

    app.get('/', (req, res) => {
      res.status(200).json({ version: '1.0' });
    });

    // Pass app to routes
    routes(app);

    app.use('*', (req, res) => {
      res.status(404).json({ status: 'error', message: `Unimplemented ${req.method} ${req.path} route access` });
    });
    // Setup error handling, this must be after all other middleware
    app.use(ExpressLoader.errorHandler);

    // Start application
    this.server = app.listen(config.port, () => {
      logger.info(`Express running, now listening on port ${config.port}`);
      // console.log(`Express running, now listening on port ${config.port}`);
    }).on('error', ExpressLoader.onError);
  }

  /**
   * server
   */
  get Server() {
    return this.server;
  }

  /**
   * @description Default error handler to be used with express
   * @param error Error object
   * @param req {object} Express req object
   * @param res {object} Express res object
   * @param next {function} Express next object
   * @returns {*} errors
   */
  static errorHandler(error, req, res, next) {
    let parsedError;

    // Attempt to gracefully parse error object
    try {
      if (error && typeof error === 'object') {
        parsedError = JSON.stringify(error);
      } else {
        parsedError = error;
      }
    } catch (e) {
      logger.error(e);
    }

    // Log the original error
    logger.error(parsedError);

    // If response is already sent, don't attempt to respond to client
    if (res.headersSent) {
      return next(error);
    }

    logger.error('Error %o', error);
    return res.json(error).status(error.httpStatusCode || error.status || 500);
  }

  /*
  @description handle specific listen errors with friendly messages
  */
  /**
 *  handle errors
 * @param {*} error
 */
  static onError(error) {
    switch (error.name) {
    case 'EACCES':
      logger.error(`${config.port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${config.port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
    }
  }
}

export default ExpressLoader;
// add helmet.js
