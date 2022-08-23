import {NextFunction, Request, Response} from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import {statusResponse, ApiResponse} from "@app/common/response-manager";
import {codeResponse} from "@app/common/code-reponse";

export const validationSchema = (schema) => {
  const rawAjv = new Ajv();
  const ajv = addFormats(rawAjv);

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationFunction = ajv.compile(schema);
      if (validationFunction(req.body)) {
        return next();
      }
      return ApiResponse(
        res,
        422,
        statusResponse.INVALID,
        codeResponse.FAILED_SCHEMA_VALIDATION,
        {},
        JSON.stringify(validationFunction.errors)
      );
    } catch (error) {
      return ApiResponse(
        res,
        422,
        statusResponse.INVALID,
        codeResponse.FAILED_SCHEMA_VALIDATION,
        {},
        JSON.stringify(error)
      );
    }
  }
}
