/* eslint-disable no-new */
import Sequelize from 'sequelize';
import ExpressLoader from './loaders/Express';
import configuration from './configs/config';
import logger from './services/Logger';

const env = process.env.NODE_ENV || 'development';
const config = configuration[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection to DB has been established successfully.');
    new ExpressLoader();
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    logger.error('Unable to connect to the database:', err);
  });

process.on('uncaughtException', (e) => {
  logger.error(e);
});
