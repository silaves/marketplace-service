import {Router} from 'express';
import {ManageProductsUsecase} from "@app/core/products/usecases/manage-products-usecase";
import {validationSchema} from "@app/common/payload-validation";
import {createProductSchema, editProductSchema} from "@app/core/products/http/products-schema-validation";

type ProductsRouterParams = {
  manageProductsUsecase: ManageProductsUsecase,
}

export const ProductsRoute = ({manageProductsUsecase}: ProductsRouterParams): Router => {
  const router = Router();
  router.get('/', manageProductsUsecase.retrieveAll.bind(manageProductsUsecase));
  router.get('/my-products', manageProductsUsecase.retrieveAllUserProducts.bind(manageProductsUsecase));
  router.get('/:id', manageProductsUsecase.retrieve.bind(manageProductsUsecase));
  router.post('/', validationSchema(createProductSchema), manageProductsUsecase.create.bind(manageProductsUsecase));
  router.put('/:id', validationSchema(editProductSchema), manageProductsUsecase.edit.bind(manageProductsUsecase));
  router.delete('/:id', manageProductsUsecase.delete.bind(manageProductsUsecase));
  return router;
}
