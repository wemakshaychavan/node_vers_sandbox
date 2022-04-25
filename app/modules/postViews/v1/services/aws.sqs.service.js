import {mergedEnvironmentConfig} from '../../../../config/env.config'
import util from 'util'
const awsSdk = require('aws-sdk');

const initializeAwsSqsInstances = async () => {
	try {

		awsSdk.config.update({
			accessKeyId: mergedEnvironmentConfig.sqs.accessKeyId,
			secretAccessKey: mergedEnvironmentConfig.sqs.secretAccessKey,
			region: mergedEnvironmentConfig.sqs.region
		});

		const awsSqsSenderInstance = new awsSdk.SQS()
		const awsSqsReceiverInstance = new awsSdk.SQS()

		return {
			awsSqsSenderInstance,
			awsSqsReceiverInstance,
			serviceError: null
		}

	} catch (error) {
		console.log(`[aws.sqs.service][V1][initializeAwsSqsInstances] service error `, error)
		return {
			awsSqsSenderInstance: null,
			awsSqsReceiverInstance: null,
			serviceError: error
		}
	}
}

const sendMessageToAwsSqsQueue = async ({awsSqsSenderInstance, messagePayload}) => {
	try {
		console.log(`[aws.sqs.service][V1][sendMessageToAwsSqsQueue] Attempting to send messagePayload `,messagePayload)
		const messageAcknowledgement = await awsSqsSenderInstance.sendMessage(messagePayload).promise()
		console.log(`[aws.sqs.service][V1][sendMessageToAwsSqsQueue] Message successfully sent. messageAcknowledgement ${messageAcknowledgement.MessageId}`)
		return {
			message: `[aws.sqs.service][V1][sendMessageToAwsSqsQueue] Message successfully sent. messageAcknowledgement: ` + util.inspect(messageAcknowledgement, { showHidden: false, depth: null }),
			serviceError: null,
			messageAcknowledgement
		}
	} catch (serviceError) {
		console.log(`[aws.sqs.service][V1][sendMessageToAwsSqsQueue] service error `, serviceError)
		return {
			message: `[aws.sqs.service][V1][sendMessageToAwsSqsQueue] service error ${serviceError}`,
			serviceError: serviceError,
			messageAcknowledgement: null
		}
	}
}

module.exports = {
	initializeAwsSqsInstances,
	sendMessageToAwsSqsQueue
}