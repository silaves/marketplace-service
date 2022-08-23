import {Router} from "express";
import {asFunction, AwilixContainer} from "awilix";
import {CategoriesRoute} from '@app/core/categories/http/categories-router';
import {UserRoute} from '@app/core/users/http/users-router';
import {ManageAuthUsecase} from "@app/core/authentication/usecases/manage-auth-usecase";
import {AuthRoute} from "@app/core/authentication/http/auth-route";
import {ProductsRoute} from "@app/core/products/http/products-router";
import {TransactionsRoute} from "@app/core/transactions/http/transactions-router";

export interface IRouteCradle {
  tokenApiController: ManageAuthUsecase;
  AuthRoute: Router;
  CategoriesRoute: Router;
  UserRoute: Router;
  ProductsRoute: Router;
  TransactionsRoute: Router;
}

const registerRoute = (container: AwilixContainer<IRouteCradle>): void => {
  container.register({
    tokenApiController: asFunction(({jwtGenerator, privateKeyProvider, publicKeyProvider, authRepository}) => {
      return new ManageAuthUsecase(jwtGenerator, privateKeyProvider, publicKeyProvider, authRepository);
    }),
    AuthRoute: asFunction(AuthRoute).singleton(),
    CategoriesRoute: asFunction(CategoriesRoute).singleton(),
    UserRoute: asFunction(UserRoute).singleton(),
    ProductsRoute: asFunction(ProductsRoute).singleton(),
    TransactionsRoute: asFunction(TransactionsRoute).singleton(),
  });
}

export default registerRoute;