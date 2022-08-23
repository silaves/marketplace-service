import {asFunction, AwilixContainer} from "awilix";
import {ManageCategoriesUsecase} from '@app/core/categories/usecases/manage-categories-usecase';
import {ManageUsersUsecase} from '@app/core/users/usecases/manage-users-usecase';
import {UsersRepository} from '@app/core/users/repositories/users-repository';
import {AuthRepository} from "@app/core/authentication/repositories/auth-repository";
import {CategoriesRepository} from "@app/core/categories/repositories/categories-repository";
import {ProductsRepository} from "@app/core/products/repositories/products-repository";
import {ManageProductsUsecase} from "@app/core/products/usecases/manage-products-usecase";
import {TransactionsRepository} from "@app/core/transactions/repositories/transactions-repository";
import {ManageTransactionsUsecase} from "@app/core/transactions/usecases/manage-transactions-usecase";

export interface IApiCradle {
  authRepository: AuthRepository;
  usersRepository: UsersRepository;
  categoriesRepository: CategoriesRepository;
  productsRepository: ProductsRepository;
  transactionsRepository: TransactionsRepository;
  manageCategoriesUsecase: ManageCategoriesUsecase;
  manageUsersUsecase: ManageUsersUsecase;
  manageProductsUsecase: ManageProductsUsecase;
  manageTransactionsUsecase: ManageTransactionsUsecase;
}

const registerUsecase = (container: AwilixContainer<IApiCradle>): void => {
  container.register({
    authRepository: asFunction(() => {
      return new AuthRepository()
    }),
    usersRepository: asFunction(() => {
      return new UsersRepository()
    }),
    categoriesRepository: asFunction(() => {
      return new CategoriesRepository()
    }),
    productsRepository: asFunction(() => {
      return new ProductsRepository()
    }),
    transactionsRepository: asFunction(() => {
      return new TransactionsRepository()
    }),
    manageCategoriesUsecase: asFunction(({categoriesRepository}) => {
      return new ManageCategoriesUsecase(categoriesRepository);
    }),
    manageUsersUsecase: asFunction(({usersRepository, authRepository}) => {
      return new ManageUsersUsecase(usersRepository, authRepository);
    }),
    manageProductsUsecase: asFunction(({productsRepository, usersRepository}) => {
      return new ManageProductsUsecase(productsRepository, usersRepository);
    }),
    manageTransactionsUsecase: asFunction(({transactionsRepository, usersRepository}) => {
      return new ManageTransactionsUsecase(transactionsRepository, usersRepository);
    }),
  });
}

export default registerUsecase;