"use strict";

import express from "express";
import mongoose from "mongoose";

import { getUsersApi, editUserApi } from "./user";
import { signUpApi, loginApi } from "./authentication";
import { STATUS_CODE_4XX, ERROR_API_NOT_FOUND } from "../utilities/constant";

const router = express.Router();
mongoose.connect(process.env.DB_CONNNECTION_STRING);

/***************************
 * Authentication APIs
 ***************************/
router.post("/apis/authentication/signup", signUpApi);
router.post("/apis/authentication/login", loginApi);

/***************************
 * User APIs
 ***************************/
//middleware (authentication) => check if the user can access the api
//ie. router.get("/apis/users", authentication, getUsers);

router.get("/apis/users", getUsersApi);
router.put("/apis/users", editUserApi);

router.all("*", (req, res) => {
  return res.status(STATUS_CODE_4XX).json({
    description: ERROR_API_NOT_FOUND,
  });
});

export default router;
