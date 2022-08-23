import {Response} from 'express';
import {getResponse} from "@app/common/code-reponse";

export const statusResponse = {
  VALID: true,
  INVALID: false
}

export interface ResponseManager {
  valid: boolean,
  code?: number;
  message?: string,
  data?: any;
  error?: string;
}

export const ApiResponse = (res: Response, statusCode: number, valid: boolean, code, body = {}, error = null) => {
  const detailCode = getResponse(code);
  const response: ResponseManager = {
    valid: valid,
    code: detailCode.code,
    message: detailCode.message,
    data: body,
    error: error
  }
  return res.status(statusCode).json(response);
}