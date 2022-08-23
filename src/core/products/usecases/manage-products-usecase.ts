import {Request, Response} from 'express';
import {statusResponse, ApiResponse} from "@app/common/response-manager";
import {codeResponse} from "@app/common/code-reponse";
import {ProductsRepository} from "@app/core/products/repositories/products-repository";
import {UsersRepository} from "@app/core/users/repositories/users-repository";
import {Category} from "@app/core/categories/entities/category";
import {NonNullFindOptions} from "sequelize";

export class ManageProductsUsecase {
  readonly productsRepository: ProductsRepository;
  readonly usersRepository: UsersRepository;

  constructor(productsRepository: ProductsRepository, usersRepository: UsersRepository) {
    this.productsRepository = productsRepository;
    this.usersRepository = usersRepository;
  }

  async create(req: Request, res: Response) {
    const user = await this.usersRepository.getUserByJWT(req.headers.authorization);
    const category = await Category.findByPk(req.body.categoryId);

    if (!category) {
      return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.FAILED_SCHEMA_VALIDATION);
    }

    if (await this.productsRepository.existProductName(req.body.name)) {
      return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.ALREADY_EXIST_OBJECT);
    }
    const productData = {
      ...req.body,
      sellerUserId: user.id,
    }
    const product = await this.productsRepository.create(productData);
    await this.productsRepository.associateCategoryToProduct(category, product);
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.OBJECT_CREATED_SUCCESSFULLY, product);
  }

  async edit(req: Request, res: Response) {
    const user = await this.usersRepository.getUserByJWT(req.headers.authorization);

    if (!user) {
      return ApiResponse(res, 403, statusResponse.INVALID, codeResponse.NOT_AUTHORIZED);
    }

    let product = await this.productsRepository.getProductByIdFromUser(req.params.id, user);
    if (!product) {
      return ApiResponse(res, 404, statusResponse.INVALID, codeResponse.OBJECT_NOT_FOUND);
    }

    if (await this.productsRepository.existProductName(req.body.name, [product.name])) {
      return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.ALREADY_EXIST_OBJECT);
    }

    if (req.body.categoryId) {
      const category = await Category.findOne({where: {id: req.body.categoryId}} as NonNullFindOptions);

      if (!category) {
        return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.FAILED_SCHEMA_VALIDATION);
      }
      await this.productsRepository.associateCategoryToProduct(category, product);
    }

    product = await this.productsRepository.update(product, req.body);
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.OBJECT_UPDATED_SUCCESSFULLY, product);
  }

  async retrieve(req: Request, res: Response) {
    const product = await this.productsRepository.getProductById(req.params.id);

    if (product) {
      return ApiResponse(res, 200, statusResponse.VALID, codeResponse.RETRIEVE_SUCCESSFUL, product);
    }
    return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND);
  }

  async retrieveAll(req: Request, res: Response) {
    const products = await this.productsRepository.getAllProducts();

    if (products) {
      return ApiResponse(res, 200, statusResponse.VALID, codeResponse.RETRIEVE_SUCCESSFUL, products);
    }
    return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND, []);
  }

  async retrieveAllUserProducts(req: Request, res: Response) {
    const user = await this.usersRepository.getUserByJWT(req.headers.authorization);
    if (!user) {
      return ApiResponse(res, 403, statusResponse.INVALID, codeResponse.NOT_AUTHORIZED);
    }

    const products = await this.productsRepository.getAllProductsByUser(user);

    if (products) {
      return ApiResponse(res, 200, statusResponse.VALID, codeResponse.RETRIEVE_SUCCESSFUL, products);
    }
    return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND, []);
  }

  async delete(req: Request, res: Response) {
    const user = await this.usersRepository.getUserByJWT(req.headers.authorization);
    if (!user) {
      return ApiResponse(res, 403, statusResponse.INVALID, codeResponse.NOT_AUTHORIZED);
    }
    const product = await this.productsRepository.getProductById(req.params.id);

    if (!product) {
      return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND);
    }

    if (product.sellerUserId !== user.id) {
      return ApiResponse(res, 403, statusResponse.INVALID, codeResponse.NOT_AUTHORIZED);
    }

    await this.productsRepository.deleteProduct(product.id);
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.SUCCESSFUL_DELETED);
  }
}
