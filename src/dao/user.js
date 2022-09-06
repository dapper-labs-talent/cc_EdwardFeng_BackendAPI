"use strict";

import UserModel from "../model/user";

const SELECTED_FIELDS = {
  _id: 1,
  email: 1,
  firstName: 1,
  lastName: 1,
  password: 1,
};

const createUser = ({ email = "", password = "", lastName = "", firstName = "" }) => {
  const newUser = new UserModel({
    email,
    password,
    firstName,
    lastName,
  });

  return new Promise((resolve, reject) => {
    newUser
      .generateHash(password)
      .then((hashedPassword) => {
        newUser.password = hashedPassword;
        return newUser.save();
      })
      .then(resolve)
      .catch(reject);
  });
};

const getAllUsers = async () => {
  const users = await UserModel.find().select(SELECTED_FIELDS);

  // filter out the returning user object
  return users.map((user) => ({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }));
};

const getOneUser = (query) =>
  new Promise((resolve, reject) => {
    UserModel.findOne(query)
      .select(SELECTED_FIELDS)
      .then((singleUser) => {
        if (singleUser) {
          return resolve(singleUser);
        } else {
          return reject({ status: 400, msg: "invalid userId" });
        }
      })
      .catch(reject);
  });

const editUser = ({ userId, email, fieldToUpdate }) =>
  new Promise((resolve, reject) => {
    UserModel.findOne({ _id: userId, email })
      .then((user) => {
        if (!user) {
          return reject({ status: 400, msg: "invalid userId" });
        }

        return UserModel.updateOne({ _id: userId }, fieldToUpdate);
      })
      .then(resolve)
      .catch(reject);
  });

const checkPassword = async ({ userObject, password }) => {
  const userModel = new UserModel(userObject);

  return await userModel.validPassword(password);
};

export { createUser, getAllUsers, getOneUser, editUser, checkPassword };
