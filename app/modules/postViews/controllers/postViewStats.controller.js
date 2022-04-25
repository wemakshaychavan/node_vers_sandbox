// Libs and utils
const { v4: uuidv4 } = require('uuid');

// Services
const HttpStatusConstants = require('../../../config/constants/httpStatusConstants');
const postViewServiceV1 = require('../v1/services/postViewStats.service');
const postViewServiceV2 = require('../v2/services/postViewStats.service');
const awsSqsService = require('../v1/services/aws.sqs.service');

// Configs
const { mergedEnvironmentConfig } = require('../../../config/env.config');

const postViewedV2 = async (req, res, next) => {
  try {
    let responseData = req.responseData ?? {};

    const { currentDateTime, serviceError } = await postViewServiceV2.postViewed({});
    if (serviceError) {
      console.error(`[StatsController] [postViewedV2] Controller serviceError: `, serviceError);
      responseData = {
        ...responseData,
        statusCode: HttpStatusConstants.STATUS_CODE_SERVER_EXCEPTION_ENCOUNTERED,
        message: serviceError?.message ?? 'Failed to handle request',
        error: serviceError,
        result: {
          currentDateTime,
        },
      };
      req.responseData = responseData;
      return next();
    }

    responseData = {
      ...responseData,
      statusCode: HttpStatusConstants.STATUS_CODE_GENERALIZED_SUCCESS,
      result: {
        currentDateTime,
      },
    };
    req.responseData = responseData;
    return next();
  } catch (controllerError) {
    console.log(`[StatsController] [postViewedV2] ControllerError `, controllerError);
    let responseData = {
      statusCode: HttpStatusConstants.STATUS_CODE_SERVER_EXCEPTION_ENCOUNTERED,
      message: controllerError?.message ?? 'Failed to handle request',
      error: controllerError,
    };
    req.responseData = responseData;
  }
  return next();
};

const updatePostStatsToSQS = async (req, res, next) => {
  try {
    let responseData = req.responseData ?? {};

    let params = req.body

    for (let i = 0; i <params.postIds.length; i++) {

      const userId = req.user.userId
      const postId = params.postIds[i]
      // const mediaId = uuidv4().toString();
      // const viewedOnPlatform = params.platform
      const viewedAt = new Date().toString();

      const { messageAcknowledgement, serviceError } = await awsSqsService.sendMessageToAwsSqsQueue({
        awsSqsSenderInstance: global.awsSqsSenderInstance,
        messagePayload: {
          // Ref: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html#sqs-message-attributes
          MessageAttributes: {
            userId: {
              DataType: 'String',
              StringValue: userId,
            },
            postId: {
              DataType: 'String',
              StringValue: postId,
            },
            createdAt: {
              DataType: 'String',
              StringValue: viewedAt,
            },
          },
          MessageBody: `User(${userId}) viewed postId(${postId}) - viewed at ${viewedAt}`,
          MessageDeduplicationId: `${userId}_${postId}`, // Required for FIFO queues
          MessageGroupId: 'PostViews', // Required for FIFO queues
          QueueUrl: mergedEnvironmentConfig.sqs.queueUrl,
        },
      });
      if (serviceError) {
        console.error(`[StatsController] [postViewSampleAwsSqsRequestSimulation] Controller serviceError: `, serviceError);
        responseData = {
          ...responseData,
          statusCode: HttpStatusConstants.STATUS_CODE_SERVER_EXCEPTION_ENCOUNTERED,
          message: serviceError?.message ?? 'Failed to handle request',
          error: serviceError,
        };
        req.responseData = responseData;
        return next();
      }

    }


    responseData = {
      ...responseData,
      statusCode: HttpStatusConstants.STATUS_CODE_GENERALIZED_SUCCESS,
    };
    req.responseData = responseData;
    return next();
  } catch (controllerError) {
    console.log(`[StatsController] [postViewSampleAwsSqsRequestSimulation] ControllerError `, controllerError);
    let responseData = {
      statusCode: HttpStatusConstants.STATUS_CODE_SERVER_EXCEPTION_ENCOUNTERED,
      message: controllerError?.message ?? 'Failed to handle request',
      error: controllerError,
    };
    req.responseData = responseData;
  }
  return next();
};

module.exports = {
  postViewedV2,
  updatePostStatsToSQS,
};
