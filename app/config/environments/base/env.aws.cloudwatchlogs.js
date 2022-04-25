module.exports = {
	cloudwatchLogs: {
		accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
		secretAccessKey: process.env.CLOUDWATCH_SECRET_KEY,
		region: process.env.CLOUDWATCH_REGION,
		logGroupName: process.env.CLOUDWATCH_LOG_GROUP_NAME,
		logName: process.env.CLOUDWATCH_LOG_NAME,
		uploadRate: parseInt(process.env.CLOUDWATCH_UPLOAD_RATE) ?? 10000
	}
};