import express, {Router} from "express";
import helmet from "helmet";
import {errorLogger, requestLogger} from "@app/framework/http/request-logger";

export function createExpressApp(router) {
  const app = express();
  app.use(helmet());
  app.use(requestLogger);
  app.use(errorLogger);
  app.use('/api', router as Router);
  return app;
}