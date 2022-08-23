import {Request, Response} from 'express';
import {JWTGenerator} from '@app/core/authentication/crypto/jwt';
import {PrivateKeyProvider} from '@app/core/authentication/crypto/private-key-provider';
import {PublicKeyProvider} from "@app/core/authentication/crypto/public-key-provider";
import {statusResponse, ApiResponse} from "@app/common/response-manager";
import {codeResponse} from "@app/common/code-reponse";
import {User} from "@app/core/users/entities/user";
import {AuthRepository} from "@app/core/authentication/repositories/auth-repository";

export class ManageAuthUsecase {
  readonly jwtGenerator;
  readonly privateKeyProvider: PrivateKeyProvider;
  readonly publicKeyProvider: PublicKeyProvider;
  readonly authRepository: AuthRepository;

  constructor(jwtGenerator: JWTGenerator, privateKeyProvider: PrivateKeyProvider, publicKeyProvider: PublicKeyProvider, authRepository: AuthRepository) {
    this.publicKeyProvider = publicKeyProvider;
    this.privateKeyProvider = privateKeyProvider;
    this.jwtGenerator = jwtGenerator;
    this.authRepository = authRepository;
  }

  async signIn(req: Request, res: Response) {
    const user = await this.authRepository.authenticate(req.body.email, req.body.password);

    if (!user) {
      return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.INCORRECT_CREDENTIALS);
    }

    const privateKey = await this.privateKeyProvider.getPrivateKey();
    const auth_token = await this.jwtGenerator.generateJWT(
      {
        userId: user.id,
        email: user.email
      },
      privateKey,
    );

    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.OBJECT_CREATED_SUCCESSFULLY, {auth_token});
  }

  async signUp(req: Request, res: Response) {
    const {name, email, password} = req.body;

    if (await this.authRepository.existEmail(email)) {
      return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.ALREADY_EXIST_EMAIL);
    }

    if (await this.authRepository.existUsername(name)) {
      return ApiResponse(res, 422, statusResponse.INVALID, codeResponse.ALREADY_EXIST_USERNAME);
    }

    const user = await this.authRepository.createUser({name, email, password} as User);
    const privateKey = await this.privateKeyProvider.getPrivateKey();
    const auth_token = await this.jwtGenerator.generateJWT({
      userId: user.id,
      email: user.email
    }, privateKey);

    const body = {
      user: user,
      authToken: auth_token
    };

    return ApiResponse(res, 200, statusResponse.VALID, codeResponse.OBJECT_CREATED_SUCCESSFULLY, body);
  }
}
