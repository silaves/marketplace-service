import {Request, Response} from 'express';
import {statusResponse, ApiResponse} from "@app/common/response-manager";
import {codeResponse} from "@app/common/code-reponse";
import {CategoriesRepository} from "@app/core/categories/repositories/categories-repository";

export class ManageCategoriesUsecase {
  readonly categoriesRepository: CategoriesRepository;

  constructor(categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async create(req: Request, res: Response) {
    if (await this.categoriesRepository.existCategoryName(req.body.name)) {
      return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.ALREADY_EXIST_OBJECT);
    }

    const category = await this.categoriesRepository.create(req.body);
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.OBJECT_CREATED_SUCCESSFULLY, category);
  }

  async edit(req: Request, res: Response) {
    let category = await this.categoriesRepository.getCategoryById(req.params.id);
    if (!category) {
      return ApiResponse(res, 404, statusResponse.INVALID, codeResponse.OBJECT_NOT_FOUND);
    }

    if (await this.categoriesRepository.existCategoryName(req.body.name, [category.name])) {
      return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.ALREADY_EXIST_OBJECT);
    }
    category = await this.categoriesRepository.update(category, req.body);
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.OBJECT_UPDATED_SUCCESSFULLY, category);
  }

  async retrieve (req: Request, res: Response) {
    const category = await this.categoriesRepository.getCategoryById(req.params.id);

    if (category) {
      return ApiResponse(res, 200, statusResponse.VALID, codeResponse.RETRIEVE_SUCCESSFUL, category);
    }
    return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND);
  }

  async retrieveAll (req: Request, res: Response) {
    const categories = await this.categoriesRepository.getAllCategories();

    if (categories) {
      return ApiResponse(res, 200, statusResponse.VALID, codeResponse.RETRIEVE_SUCCESSFUL, categories);
    }
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND, []);
  }

  async delete (req: Request, res: Response) {
    const category = await this.categoriesRepository.getCategoryById(req.params.id);

    if (!category) {
      return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND);
    }
    await this.categoriesRepository.deleteCategory(category.id);
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.SUCCESSFUL_DELETED);
  }
}
