"use strict";

import { getOneUser } from "../../dao/user";

const validateCreateInputs = async ({ email, password, firstName, lastName }) => {
  if (!email || !password || !firstName || !lastName) {
    return false;
  }

  const user = await getOneUser({ email });
  if (user) {
    return false;
  }

  return true;
};

const validateLoginInputs = ({ email, password }) => {
  if (!email || !password) {
    return false;
  }

  return true;
};

const validateUserUpdateInputs = ({ email, userId, firstName, lastName }) => {
  if (!email || !userId || !firstName || !lastName) {
    return false;
  }

  return true;
};

export { validateCreateInputs, validateLoginInputs, validateUserUpdateInputs };
