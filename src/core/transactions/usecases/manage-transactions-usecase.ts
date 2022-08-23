import {Request, Response} from 'express';
import {statusResponse, ApiResponse} from "@app/common/response-manager";
import {codeResponse} from "@app/common/code-reponse";
import {TransactionsRepository} from "@app/core/transactions/repositories/transactions-repository";
import {UsersRepository} from "@app/core/users/repositories/users-repository";

export class ManageTransactionsUsecase {
  readonly transactionsRepository: TransactionsRepository;
  readonly usersRepository: UsersRepository;

  constructor(transactionsRepository: TransactionsRepository, usersRepository: UsersRepository) {
    this.transactionsRepository = transactionsRepository;
    this.usersRepository = usersRepository;
  }

  async create(req: Request, res: Response) {
    const user = await this.usersRepository.getUserByJWT(req.headers.authorization);
    if (!user) {
      return ApiResponse(res, 403, statusResponse.INVALID, codeResponse.NOT_AUTHORIZED);
    }

    if (!await this.transactionsRepository.verifyTransaction(req.body.details)) {
      return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.FAILED_TRANSACTION_VALIDATION);
    }

    const transaction = await this.transactionsRepository.create(user, req.body.details);
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.OBJECT_CREATED_SUCCESSFULLY, transaction);
  }

  // async edit(req: Request, res: Response) {
  //   let transaction = await this.transactionsRepository.getTransactionById(req.params.id);
  //
  //   if (!transaction) {
  //     return ApiResponse(res, 404, statusResponse.INVALID, codeResponse.OBJECT_NOT_FOUND);
  //   }
  //
  //   if (await this.transactionsRepository.existTransactionName(req.body.name, [transaction.name])) {
  //     return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.ALREADY_EXIST_OBJECT);
  //   }
  //
  //   transaction = await this.transactionsRepository.update(transaction, req.body);
  //   return ApiResponse(res, 200, statusResponse.VALID, codeResponse.OBJECT_UPDATED_SUCCESSFULLY, transaction);
  // }

  async retrieve (req: Request, res: Response) {
    const transaction = await this.transactionsRepository.getTransactionById(req.params.id);

    if (transaction) {
      return ApiResponse(res, 200, statusResponse.VALID, codeResponse.RETRIEVE_SUCCESSFUL, transaction);
    }
    return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND);
  }

  async retrieveAll (req: Request, res: Response) {
    const transactions = await this.transactionsRepository.getAllTransactions();

    if (transactions) {
      return ApiResponse(res, 200, statusResponse.VALID, codeResponse.RETRIEVE_SUCCESSFUL, transactions);
    }
    return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND, []);
  }

  async retrieveAllMySales (req: Request, res: Response) {
    const user = await this.usersRepository.getUserByJWT(req.headers.authorization);
    if (!user) {
      return ApiResponse(res, 403, statusResponse.INVALID, codeResponse.NOT_AUTHORIZED);
    }

    const products = await this.transactionsRepository.getAllMySales(user);

    if (products) {
      return ApiResponse(res, 200, statusResponse.VALID, codeResponse.RETRIEVE_SUCCESSFUL, products);
    }
    return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND, []);
  }

  async retrieveAllMyTransactions (req: Request, res: Response) {
    const user = await this.usersRepository.getUserByJWT(req.headers.authorization);
    if (!user) {
      return ApiResponse(res, 403, statusResponse.INVALID, codeResponse.NOT_AUTHORIZED);
    }

    const products = await this.transactionsRepository.getAllMyTransactions(user);

    if (products) {
      return ApiResponse(res, 200, statusResponse.VALID, codeResponse.RETRIEVE_SUCCESSFUL, products);
    }
    return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND, []);
  }

  async delete (req: Request, res: Response) {
    const transaction = await this.transactionsRepository.getTransactionById(req.params.id);

    if (!transaction) {
      return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND);
    }
    await this.transactionsRepository.deleteTransaction(transaction.id);
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.SUCCESSFUL_DELETED);
  }
}
