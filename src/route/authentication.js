"use strict";

import logger from "../utilities/logger";

import { validateCreateInputs, validateLoginInputs } from "./validator/userValidator";
import { createUser, getOneUser, checkPassword } from "../dao/user";
import { generateJwtToken } from "../dao/jwt";
import {
  STATUS_CODE_200,
  STATUS_CODE_4XX,
  STATUS_CODE_5XX,
  ERROR_MESSAGE_INTERNAL_SERVER_ERROR,
  ERROR_MESSAGE_INVALID_INPUT,
  ERROR_MESSAGE_WRONG_LOGIN,
} from "../utilities/constant";

const signUpApi = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const validationResult = validateCreateInputs({ email, password, firstName, lastName });
    if (!validationResult) {
      return res.status(STATUS_CODE_4XX).json({
        description: ERROR_MESSAGE_INVALID_INPUT,
      });
    }

    const newUser = await createUser({
      email,
      password,
      firstName,
      lastName,
    });
    const jwtToken = generateJwtToken({ userId: newUser._id, email: email });

    return res.status(STATUS_CODE_200).json({
      token: jwtToken,
    });
  } catch (err) {
    logger.error(err);

    return res.status(STATUS_CODE_5XX).json({
      description: ERROR_MESSAGE_INTERNAL_SERVER_ERROR,
    });
  }
};

const loginApi = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationResult = validateLoginInputs({ email, password });
    if (!validationResult) {
      return res.status(STATUS_CODE_4XX).json({
        description: ERROR_MESSAGE_INVALID_INPUT,
      });
    }

    const user = await getOneUser({ email });
    const passResult = await checkPassword({ userObject: user, password });
    if (!passResult) {
      return res.status(STATUS_CODE_4XX).send({
        description: ERROR_MESSAGE_WRONG_LOGIN,
      });
    }

    const jwtToken = generateJwtToken({ userId: user._id, email });

    return res.status(STATUS_CODE_200).send({
      token: jwtToken,
    });
  } catch (err) {
    logger.error(err);
    res.status(STATUS_CODE_5XX).json({
      description: ERROR_MESSAGE_INTERNAL_SERVER_ERROR,
    });
  }
};

export { signUpApi, loginApi };
