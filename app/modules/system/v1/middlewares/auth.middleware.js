import { compare } from 'compare-versions';
import { mergedEnvironmentConfig } from '../../../../config/env.config';
import * as HttpStatusConstants from '../../../../config/constants/httpStatusConstants';
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  try {
    let token = req.get('access-token');
    if (token){

      console.log("token----------->",token)

      let tokenArray = token.split(" ");
      token= tokenArray[1];
      console.log(" process.env.AUTH_ACCESS_JWT_SECRET----------->", process.env.AUTH_ACCESS_JWT_SECRET)
      jwt.verify(token, process.env.AUTH_ACCESS_JWT_SECRET, function (err, decoded) {
        if (err) {
          res.status(401).send()
          // return done();
        } else {

          console.log(" process.env.AUTH_ACCESS_JWT_SECRET----decoded------->", decoded)
          req.user = decoded
          return next();
        }
      });

    }else{
      res.status(401).send()
    }

  } catch (middlewareError) {
    console.log(`[jwt validation] Error: `, middlewareError);
    req.responseData = {
      message: `An error occurred while validating a user`,
      error: middlewareError,
    };
    res.send(); // Terminate the middleware chain
  }
};
