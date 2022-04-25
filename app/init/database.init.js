const Sequelize = require('sequelize');
const glob = require('glob');
import { mergedEnvironmentConfig } from '../config/env.config.js';
const config = mergedEnvironmentConfig.rdbms;
import colors from 'colors/safe';

const loggingOptions = {
  benchmark: true,
  logging: (logStr, execTime, options) => {
    if (!options) {
      options = execTime;
      execTime = undefined;
    }

    let col = null;
    switch (options.type) {
      case 'SELECT':
        col = colors.blue.bold;
        break;
      case 'UPDATE':
        col = colors.yellow.bold;
        break;
      case 'INSERT':
        col = colors.green.bold;
        break;
      default:
        col = colors.white.bold;
        break;
    }

    if (execTime) {
      if (execTime >= 10) {
        col = colors.red.bold;
        console.log(colors.brightRed.bold(`[${execTime} ms]`), col(logStr));
      } else {
        col = colors.white;
        console.log(colors.brightWhite(`[${execTime} ms]`), col(logStr));
      }
    }
  },
};

let configurationOptions = {
  define: config.connectorConfiguration,
  database: config.name,
  username: config.username,
  password: config.password,
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: 0,
  pool: config.pool,
};
if (config.isEnableSqlLogging) {
  configurationOptions = { ...configurationOptions, ...loggingOptions };
} else {
  configurationOptions = { ...configurationOptions, logging: false };
}

const rawDbConnection = new Sequelize(configurationOptions);

const databaseConfig = function () {
  console.log('Setting up database connection');
  const database = {
    models: {},
    SequelizeLibrary: Sequelize,
    rawDbConnection,
  };
  glob
    .sync('**/*.model.js', {
      cwd: `${global.__basedir}/modules/`,
    })
    .map((filename) => require(`../modules/${filename}`)(rawDbConnection, Sequelize))
    .filter((modelClass) => Object.getPrototypeOf(modelClass) === Sequelize.Model)
    .map((modelClass) => {
      console.log(`Registered DB model: ${modelClass.getTableName()}`);
      database.models[modelClass.getTableName()] = modelClass;
      return database.models;
    });

  return database;
};

const setupDatabaseConnection = async function ({ database }) {
  try {
    await database.rawDbConnection.sync({
      force: true,
    });
    console.log('Database connection established');
  } catch (dbConnectionError) {
    console.error('Database connection issue ', dbConnectionError);
  }
};

module.exports = {
  databaseConfig,
  setupDatabaseConnection,
};
