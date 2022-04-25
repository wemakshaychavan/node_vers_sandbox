module.exports = {
	sqs: {
		accessKeyId: process.env.SQS_ACCESS_KEY,
		secretAccessKey: process.env.SQS_SECRET_KEY,
		region: process.env.SQS_REGION,
		queueUrl: process.env.SQS_QUEUE_URL,
		maxNumberOfMessagesPerSubscriberService: parseInt(process.env.SQS_MESSAGE_RATE_PER_SUBSCRIBER) ?? 10,
		queueLongpollingIntervalInSeconds: parseInt(process.env.SQS_LONG_POLLING_INTERVAL_IN_SECONDS) ?? 10,
		messageVisibilityTimeoutInSeconds: parseInt(process.env.SQS_MESSAGE_VISIBILITY_IN_SECONDS) ?? 60,
		microservicePollingIntervalInMilliseconds: parseInt(process.env.SQS_MICROSERVICE_POLLING_INTERVAL_IN_MILLISECONDS) ?? 10000
	}
};
