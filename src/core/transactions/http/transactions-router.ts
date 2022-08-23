import {Router} from 'express';
import {ManageTransactionsUsecase} from "@app/core/transactions/usecases/manage-transactions-usecase";
import {validationSchema} from "@app/common/payload-validation";
import {createTransactionSchema} from "@app/core/transactions/http/transactions-schema-validation";

type TransactionsRouterParams = {
  manageTransactionsUsecase: ManageTransactionsUsecase,
}

export const TransactionsRoute = ({manageTransactionsUsecase}: TransactionsRouterParams): Router => {
  const router = Router();
  router.get('/', manageTransactionsUsecase.retrieveAll.bind(manageTransactionsUsecase));
  router.get('/my-sales', manageTransactionsUsecase.retrieveAllMySales.bind(manageTransactionsUsecase));
  router.get('/my-transactions', manageTransactionsUsecase.retrieveAllMyTransactions.bind(manageTransactionsUsecase));
  router.get('/:id', manageTransactionsUsecase.retrieve.bind(manageTransactionsUsecase));
  router.post('/', validationSchema(createTransactionSchema), manageTransactionsUsecase.create.bind(manageTransactionsUsecase));
  router.delete('/:id', manageTransactionsUsecase.delete.bind(manageTransactionsUsecase));
  return router;
}
