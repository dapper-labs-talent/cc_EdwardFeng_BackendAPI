"use strict";

import path from "path";
import dotenv from "dotenv";

import { DEVELOPEMENT } from "./constant";

dotenv.config({
  path: path.join(__dirname, "../../config/.env"),
  slient: true,
});

export const getDatabase = () => {
  return process.env.NODE_ENV === DEVELOPEMENT ? process.env.DEV_DB : process.env.PROD_DB;
};
