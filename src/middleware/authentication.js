"use strict";

import logger from "../utilities/logger";

import { verifyJwtToken } from "../dao/jwt";
import {
  JWT_TOKEN_HEADER,
  STATUS_CODE_4XX,
  STATUS_CODE_5XX,
  ERROR_MESSAGE_INTERNAL_SERVER_ERROR,
  ERROR_UNAUTORIZED_CALL,
} from "../utilities/constant";

const authentication = async (req, res, next) => {
  try {
    /*************
     * Skip validating
     **************/
    if (req.path.startsWith("/apis/authentication")) {
      logger.info(`Request: ${req.method} ${req.path} User=${req.userId}`);
      return next();
    }

    /*************
     * Validate token
     **************/
    const token = req.headers[JWT_TOKEN_HEADER];

    if (!token) {
      return res.status(STATUS_CODE_4XX).send({
        description: ERROR_UNAUTORIZED_CALL,
      });
    }

    const { err, decoded } = await verifyJwtToken({ token });
    if (err) {
      return res.status(STATUS_CODE_4XX).json({
        description: ERROR_UNAUTORIZED_CALL,
      });
    }

    req.userId = decoded.userId;
    req.email = decoded.email;
    logger.info(`Request: ${req.method} ${req.path} User=${req.userId}`);
    return next();
  } catch (err) {
    logger.error(err);

    return res.status(STATUS_CODE_5XX).json({
      description: ERROR_MESSAGE_INTERNAL_SERVER_ERROR,
    });
  }
};

export { authentication };
