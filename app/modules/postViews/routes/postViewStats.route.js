// API configuration
const config = require('../../../config/env.config');
const minimumSupportedApiVersion = (config.minimumSupportedApiVersion ?? "1")

// Middleware
const mobileAppVersionCompatabilityMiddlewareV1 = require('../../system/v1/middlewares/mobileAppCompatability.middleware')
const responseInterceptorMiddlewareV1 = require('../../system/v1/middlewares/responseInterceptor.middleware')
const authMiddlewareV1 = require('../../system/v1/middlewares/auth.middleware')
const routePreCheckMiddlewares = [
	authMiddlewareV1.auth
]

// Controller
const postViewStatsController = require('../controllers/postViewStats.controller');

// Routes
const express = require('express')
const router = express.Router();

// APIs
router.post(`/updatePostStatsToSQS`, routePreCheckMiddlewares, postViewStatsController.updatePostStatsToSQS, responseInterceptorMiddlewareV1.responseFilter);
router.post(`/v${minimumSupportedApiVersion}/updatePostStatsToSQS`, routePreCheckMiddlewares, postViewStatsController.updatePostStatsToSQS, responseInterceptorMiddlewareV1.responseFilter);
router.post(`/v2/postViewed`, routePreCheckMiddlewares, postViewStatsController.postViewedV2, responseInterceptorMiddlewareV1.responseFilter);

module.exports = router;