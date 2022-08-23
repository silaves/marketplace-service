import express, {Router, Express} from "express";
import {asFunction, AwilixContainer} from "awilix";
import {createExpressApp} from "@app/framework/http/express";
import {authorizationMiddleware} from "@app/core/authentication/http/auht-middleware";

export interface IStartUpCradle {
  authorizationMiddleware: any;
  router: Router;
  express: Express;
}

const registerStartUp = (container: AwilixContainer<IStartUpCradle>): void => {
  container.register({
    authorizationMiddleware: asFunction(authorizationMiddleware).singleton(),
    router: asFunction(({
      CategoriesRoute,
      UserRoute,
      AuthRoute,
      authorizationMiddleware,
      ProductsRoute,
      TransactionsRoute
    }) => {
      const router = Router();
      router.use(express.json());
      router.use('/auth', AuthRoute as Router);
      router.use(authorizationMiddleware);
      router.use('/categories', CategoriesRoute as Router);
      router.use('/users', UserRoute as Router);
      router.use('/products', ProductsRoute as Router);
      router.use('/transactions', TransactionsRoute as Router);
      return router;
    }),
    express: asFunction(({router}) => {
      return createExpressApp(router);
    }),
  });
}

export default registerStartUp;
