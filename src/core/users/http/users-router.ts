import {Router} from 'express';
import {ManageUsersUsecase} from '@app/core/users/usecases/manage-users-usecase';
import {validationSchema} from "@app/common/payload-validation";
import {editUserSchema, changePasswordSchema} from "@app/core/users/http/users-schema-validation";

type UserRouterParams = {
  manageUsersUsecase: ManageUsersUsecase,
}

export const UserRoute = ({manageUsersUsecase}: UserRouterParams): Router => {
  const router = Router();
  router.get('/', manageUsersUsecase.retrieveAll.bind(manageUsersUsecase));
  router.get('/:id', manageUsersUsecase.retrieve.bind(manageUsersUsecase));
  router.patch('/edit', validationSchema(editUserSchema), manageUsersUsecase.edit.bind(manageUsersUsecase));
  router.patch('/change-password', validationSchema(changePasswordSchema), manageUsersUsecase.changePassword.bind(manageUsersUsecase));
  router.delete('/:id', manageUsersUsecase.delete.bind(manageUsersUsecase));
  return router;
}
