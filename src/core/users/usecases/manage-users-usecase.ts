import {Request, Response} from 'express';
import {UsersRepository} from "@app/core/users/repositories/users-repository";
import {statusResponse, ApiResponse} from "@app/common/response-manager";
import {codeResponse} from "@app/common/code-reponse";
import {AuthRepository} from "@app/core/authentication/repositories/auth-repository";

export class ManageUsersUsecase {
  readonly usersRepository: UsersRepository;
  readonly authRepository: AuthRepository;

  constructor(usersRepository: UsersRepository, authRepository: AuthRepository) {
    this.usersRepository = usersRepository;
    this.authRepository = authRepository;
  }

  async edit (req: Request, res: Response) {
    const newEmail = req.body.email;
    const newName = req.body.name;
    let user = await this.usersRepository.getUserByJWT(req.headers.authorization);

    if (!user) {
      return ApiResponse(res, 404, statusResponse.INVALID, codeResponse.OBJECT_NOT_FOUND);
    }

    if (await this.usersRepository.existEmail(newEmail, [user.email])){
      return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.ALREADY_EXIST_EMAIL);
    }

    if (await this.usersRepository.existUsername(newName, [user.name])){
      return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.ALREADY_EXIST_USERNAME);
    }

    if (newEmail) {
      user.email = newEmail;
    }
    if (newName) {
      user.name = newName;
    }

    user = await user.save();
    return ApiResponse(res, 422, statusResponse.VALID, codeResponse.OBJECT_CREATED_SUCCESSFULLY, user);
  }

  async changePassword (req: Request, res: Response) {
    let user = await this.usersRepository.getUserByJWT(req.headers.authorization);

    if (!this.authRepository.comparePassword(user.password, req.body.oldPassword)) {
      return ApiResponse(res, 403, statusResponse.INVALID, codeResponse.NOT_AUTHORIZED);
    }
    user.password = this.authRepository.makePassword(req.body.newPassword);
    user = await user.save()
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.OBJECT_CREATED_SUCCESSFULLY, user);
  }

  async retrieve (req: Request, res: Response) {
    const userId = req.params.id;
    const user = await this.usersRepository.getUserById(userId);

    if (user) {
      return ApiResponse(res, 200, statusResponse.VALID, codeResponse.RETRIEVE_SUCCESSFUL, user);
    }
    return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND);
  }

  async retrieveAll (req: Request, res: Response) {
    const users = await this.usersRepository.getAllUsers();

    if (users) {
      return ApiResponse(res, 200, statusResponse.VALID, codeResponse.RETRIEVE_SUCCESSFUL, users);
    }
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND, []);
  }

  async delete (req: Request, res: Response) {
    const userId = req.params.id;
    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      return ApiResponse(res, 404, statusResponse.VALID, codeResponse.OBJECT_NOT_FOUND);
    }
    await this.usersRepository.deleteUser(userId);
    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.SUCCESSFUL_DELETED);
  }
}
