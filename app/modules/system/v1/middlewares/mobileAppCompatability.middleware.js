import { compare } from 'compare-versions';
import { mergedEnvironmentConfig } from '../../../../config/env.config';
import * as HttpStatusConstants from '../../../../config/constants/httpStatusConstants';

exports.mobileAppVersionCompatabilityCheck = async (req, res, next) => {
  try {
    if (req.get('appVersion') === undefined || req.get('platform') === undefined) {
      return next();
    }

    let forcefulAppVersion = null;
    let optionalAppVersion = null;
    const mobileAppVersionFromRequestHeader = req.get('appVersion');

    if (req.get('platform') === 'ios') {
      forcefulAppVersion = mergedEnvironmentConfig.mobileApplicationMinimumAllowedVersions.ios.minimumVersion;
      optionalAppVersion = mergedEnvironmentConfig.mobileApplicationMinimumAllowedVersions.ios.optionalVersion;
    } else if (req.get('platform') === 'android') {
      forcefulAppVersion = mergedEnvironmentConfig.mobileApplicationMinimumAllowedVersions.android.minimumVersion;
      optionalAppVersion = mergedEnvironmentConfig.mobileApplicationMinimumAllowedVersions.android.optionalVersion;
    }

    if (compare(mobileAppVersionFromRequestHeader, optionalAppVersion, '=')) {
      // No updates available
      console.log(`No app updates available.`);
      req.responseData = {
        statusCode: HttpStatusConstants.STATUS_CODE_GENERALIZED_SUCCESS,
        mobileApplicationUpgradeStatus: {
          updateStatusCode: 'NO_UPDATE_REQUIRED',
          message: 'No update required',
          latestVersion: optionalAppVersion,
        },
      };
      return next();
    } else if (compare(mobileAppVersionFromRequestHeader, forcefulAppVersion, '<')) {
      // If the incoming version is lower than the expected mobileApplicationMinimumAllowedVersion, then send status code 426
      console.log(`Forceful app update required.`);
      res.status(HttpStatusConstants.STATUS_CODE_GENERALIZED_UPGRADE_REQUIRED);
      res.setHeader('version', mobileApplicationMinimumAllowedVersion);
      let responseData = {
        mobileApplicationUpgradeStatus: {
          updateStatusCode: 'FORCEFUL_UPGRADE_REQUIRED',
          message: 'Forceful app update required',
          latestVersion: optionalAppVersion,
        },
      };
      res.json(responseData);
      res.send(); // Terminate the middleware chain
    } else if (compare(mobileAppVersionFromRequestHeader, forcefulAppVersion, '>=') && compare(mobileAppVersionFromRequestHeader, optionalAppVersion, '<')) {
      console.log(`Optional app updates available.`);
      responseData = {
        statusCode: Constants.STATUS_CODE_SUCCESS,
        mobileApplicationUpgradeStatus: {
          updateStatusCode: 'OPTIONAL_RELEASE_AVAILABLE',
          message: 'Optional updates available.',
          latestVersion: optionalAppVersion,
        },
      };
      req.responseData = responseData;
      return next();
    }

  } catch (middlewareError) {
    console.log(`[mobileAppVersionCompatabilityCheck] Error: `, middlewareError);
    req.responseData = {
      message: `An error occurred while validating the minimum mobile application version compatability.`,
      error: middlewareError,
    };
    res.send(); // Terminate the middleware chain
  }
};
