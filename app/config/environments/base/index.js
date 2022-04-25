const baseConfig = require('./env.base');
const dbConfig = require('./env.db');
const authenticationConfig = require('./env.auth');
const mailConfig = require('./env.email');
const corsConfig = require('./env.cors');
const awsSqsConfig = require('./env.aws.sqs');
const awsCloudWatchConfig = require('./env.aws.cloudwatchlogs');
const redisConfig = require('./env.redis');

const mergedEnvironmentConfig = {
	...baseConfig,
	...dbConfig,
	...authenticationConfig,
	...mailConfig,
	...corsConfig,
	...awsSqsConfig,
	...awsCloudWatchConfig,
	...redisConfig
};

Object.freeze(mergedEnvironmentConfig);
module.exports = mergedEnvironmentConfig;
