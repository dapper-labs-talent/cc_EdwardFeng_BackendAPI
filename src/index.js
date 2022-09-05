"use strict";

import express from "express";
import cors from "cors";
import _ from "./utilities/env";
import logger from "./utilities/logger";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(process.env.PORT, (error, server) => {
  if (error) {
    logger.error({ err }, "Failed to start server");
  } else {
    logger.info(`Started server on ${process.env.PORT}`);
  }
});

export default app;
