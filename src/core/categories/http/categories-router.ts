import {Router} from 'express';
import {ManageCategoriesUsecase} from "@app/core/categories/usecases/manage-categories-usecase";

type CategoriesRouterParams = {
  manageCategoriesUsecase: ManageCategoriesUsecase,
}

export const CategoriesRoute = ({manageCategoriesUsecase}: CategoriesRouterParams): Router => {
  const router = Router();
  router.get('/', manageCategoriesUsecase.retrieveAll.bind(manageCategoriesUsecase));
  router.get('/:id', manageCategoriesUsecase.retrieve.bind(manageCategoriesUsecase));
  router.post('/', manageCategoriesUsecase.create.bind(manageCategoriesUsecase));
  router.put('/:id', manageCategoriesUsecase.edit.bind(manageCategoriesUsecase));
  router.delete('/:id', manageCategoriesUsecase.delete.bind(manageCategoriesUsecase));
  return router;
}
