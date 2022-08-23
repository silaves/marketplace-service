import { decodeJwt } from 'jose';

export function parseJwt (token: string) {
  return decodeJwt(token.replace(/^Bearer\s+/, ""));
}