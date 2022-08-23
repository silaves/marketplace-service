import {createPrivateKey, createPublicKey, KeyObject} from 'crypto';
import { SignJWT, JWTPayload, jwtVerify } from 'jose';
import {v4 as uuidv4} from 'uuid';

type TokenPayload = {
  userId: string;
};

type VerificationResult = {
  valid: boolean;
  error?: Error;
  payload?: JWTPayload;
};

export class JWTGenerator {
  private jwtAlgorythm = 'RS256';
  private jwtTokenType = 'JWT';
  private jwtIssuer: string;
  private jwtAudience: string;

  constructor (jwtIssuer: string, jwtAudience: string) {
    this.jwtIssuer = jwtIssuer;
    this.jwtAudience = jwtAudience;
  }

  generateJWT(
    payload: TokenPayload,
    privateKey: string | KeyObject,
    subject: string | undefined = undefined,
    expirationTime: string | number = '3h',
    jti: string | undefined = undefined,
  ): Promise<string> {
    const tokenId = jti ?? uuidv4();
    const signer = new SignJWT(payload)
      .setProtectedHeader({alg: this.jwtAlgorythm, typ: this.jwtTokenType})
      .setIssuedAt()
      .setIssuer(this.jwtIssuer)
      .setAudience(this.jwtAudience)
      .setExpirationTime(expirationTime)
      .setJti(tokenId);
    if (subject) {
      signer.setSubject(subject);
    }
    return signer.sign(JWTGenerator.sanitizePrivateKey(privateKey));
  }

  verifyJWT(token: string | Uint8Array, publicKey: string | KeyObject): Promise<VerificationResult> {
    return jwtVerify(token, JWTGenerator.sanitizePublicKey(publicKey), {
      algorithms: [this.jwtAlgorythm],
      audience: this.jwtAudience,
      issuer: this.jwtIssuer,
      typ: this.jwtTokenType,
    })
      .then(result => {
        return {valid: true, payload: result.payload};
      })
      .catch(error => {
        return {valid: false, error};
      });
  }

  private static sanitizePrivateKey(privateKey: string | KeyObject): KeyObject {
    if (typeof privateKey === 'string') {
      return createPrivateKey({
        key: privateKey,
        format: 'pem',
        type: 'pkcs8',
      });
    }
    return privateKey;
  }

  private static sanitizePublicKey(publicKey: string | KeyObject): KeyObject {
    if (typeof publicKey === 'string') {
      return createPublicKey({
        key: publicKey,
        format: 'pem',
        type: 'spki',
      });
    }
    return publicKey;
  }
}
