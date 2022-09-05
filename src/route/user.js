"use strict";

import logger from "../../utilities/logger";

import { validateUserUpdateInputs } from "./validator/userValidator";
import { getAllUsers, editUser } from "../dao/user";
import {
  STATUS_CODE_200,
  STATUS_CODE_4XX,
  STATUS_CODE_5XX,
  ERROR_MESSAGE_INTERNAL_SERVER_ERROR,
  ERROR_MESSAGE_INVALID_INPUT,
} from "../utilities/constant";

const getUsersApi = async (req, res) => {
  try {
    const users = await getAllUsers();

    return res.status(STATUS_CODE_200).json({
      users,
    });
  } catch (err) {
    logger.error(err);

    res.status(STATUS_CODE_5XX).json({
      description: ERROR_MESSAGE_INTERNAL_SERVER_ERROR,
    });
  }
};

const editUserApi = async (req, res) => {
  try {
    const { userId, email } = req;
    const { firstName, lastName } = req.body;

    if (!validateUserUpdateInputs({ userId, email, firstName, lastName })) {
      return res.status(STATUS_CODE_4XX).json({
        description: ERROR_MESSAGE_INVALID_INPUT,
      });
    }

    await editUser({ userId, email, fieldToUpdate: { firstName, lastName } });

    return res.status(STATUS_CODE_200);
  } catch (err) {
    logger.error(err);

    res.status(STATUS_CODE_5XX).json({
      description: ERROR_MESSAGE_INTERNAL_SERVER_ERROR,
    });
  }
};

export { getUsersApi, editUserApi };
