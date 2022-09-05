"use strict";

import express from "express";
import cors from "cors";
import _ from "./utilities/env";
import logger from "./utilities/logger";
import bodyParser from "body-parser";
import { authentication } from "./middleware/authentication";
import routes from "./route";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(authentication);
app.use(routes);

app.listen(process.env.PORT, (error, server) => {
  if (error) {
    logger.error({ err }, "Failed to start server");
  } else {
    logger.info(`Started server on ${process.env.PORT}`);
  }
});

export default app;
