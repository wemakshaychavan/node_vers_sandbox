import WinstonCloudWatch from 'winston-cloudwatch';
import winston from 'winston';
import AWS from 'aws-sdk';
import { mergedEnvironmentConfig } from '../../config/env.config.js';
const { combine, timestamp, prettyPrint } = winston.format;

const logger = winston.add(
  new WinstonCloudWatch({
    name: mergedEnvironmentConfig.cloudwatchLogs.logName,
    logGroupName: mergedEnvironmentConfig.cloudwatchLogs.logGroupName,
    logStreamName: function () {
      // Spread log streams across dates as the server stays up
      let date = new Date().toISOString().split('T')[0];
      return date;
    },
    cloudWatchLogs: new AWS.CloudWatchLogs({
      region: mergedEnvironmentConfig.cloudwatchLogs.region,
      accessKeyId: mergedEnvironmentConfig.cloudwatchLogs.accessKeyId,
      secretAccessKey: mergedEnvironmentConfig.cloudwatchLogs.secretAccessKey,
    }),
    jsonMessage: true,
    format: combine(timestamp(), prettyPrint()),
    handleExceptions: true, // Reference: https://github.com/lazywithclass/winston-cloudwatch/issues/44#issuecomment-255586557
    uploadRate: mergedEnvironmentConfig.cloudwatchLogs.uploadRate, // TYpe: Number. This denotes how often logs have to be sent to AWS. Be careful of not hitting AWS CloudWatch Logs limits, the default is 2000ms.
  })
);

logger.exitOnError = false; // do not exit logger when uncaught exception occurs

const transport = logger.transports.find((currentTransport) => currentTransport.name === mergedEnvironmentConfig.cloudwatchLogs.logName);
transport?.kthxbye(function (error) {
  // Reference: https://github.com/lazywithclass/winston-cloudwatch/blob/master/index.js#L147
  console.log(`[VIEW STATS][WinstonCloudWatchLogger] kthxbye callback overidden at ${new Date()}`);
  if (error !== null && error !== undefined) {
    console.error(`[VIEW STATS][WinstonCloudWatchLogger] Exception while sending log to AWS Cloudwatch logger at ${new Date()}. Error: `, error);
  }
});

// Note : Reference: https://github.com/lazywithclass/winston-cloudwatch/issues/44#issuecomment-255586557
// this error should log immediately, before the 3000ms timeout.
// throw new Error('[LOCAL DEV ENV] test exception logger response time!')
// winston.error(`[LOCAL DEV ENV] test intentionally thrown Winston error!`)

// write all the logs to the file in production environment only
if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({ filename: __dirname + '/actions.log' }));
}

module.exports = logger
