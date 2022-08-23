import {NextFunction, Request, Response} from 'express';
import {statusResponse, ApiResponse} from "@app/common/response-manager";
import {codeResponse} from "@app/common/code-reponse";

export function authorizationMiddleware({publicKeyProvider, jwtGenerator}){
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      return ApiResponse(res, 401, statusResponse.INVALID, codeResponse.NOT_AUTHENTICATE);
    } else {
      const authorization = req.headers.authorization;
      const token = authorization.replace(/^Bearer\s+/, "");
      const publicKey = await publicKeyProvider.getPublicKey();
      const resultValidation = await jwtGenerator.verifyJWT(token, publicKey);
      if (!resultValidation.valid) {
        return ApiResponse(res, 401, statusResponse.INVALID, codeResponse.NOT_AUTHENTICATE);
      }
      return next();
    }
  }
}