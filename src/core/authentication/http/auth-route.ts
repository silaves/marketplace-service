import {Router} from 'express';
import {validationSchema} from "@app/common/payload-validation";
import {userSchema, signInSchema} from "@app/core/authentication/http/users-schema-validation";

export const AuthRoute = ({tokenApiController}): Router => {
  const router = Router();
  router.post('/sing-in', validationSchema(signInSchema), tokenApiController.signIn.bind(tokenApiController));
  router.post('/sing-up', validationSchema(userSchema), tokenApiController.signUp.bind(tokenApiController));
  return router;
}
