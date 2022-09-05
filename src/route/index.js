"use strict";

import express from "express";
import mongoose from "mongoose";

import { getUsersApi, editUserApi } from "./user";
import { signUpApi, loginApi } from "./authentication";

const router = express.Router();
mongoose.connect(process.env.DB_CONNNECTION_STRING);

/***************************
 * Authentication APIs
 ***************************/
router.post("/apis/authentication/signup", signUpApi);
router.post("/apis/authentication/login", loginApi);

/***************************
 * Admin APIs
 ***************************/
//middleware (authentication) => check if the user can access the api
//ie. router.get("/apis/admins", authentication, getUsers);

router.get("/apis/admins", getUsersApi);
router.put("/apis/admins", editUserApi);

router.all("*", function (req, res) {
  res.status(404).json({
    status: 404,
    description: "API not found",
  });
});

export default router;
