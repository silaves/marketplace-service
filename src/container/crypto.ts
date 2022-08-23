import {JWTGenerator} from "@app/core/authentication/crypto/jwt";
import {asFunction, AwilixContainer} from 'awilix';
import {FilePrivateKeyProvider, PrivateKeyProvider} from '@app/core/authentication/crypto/private-key-provider';
import {FilePublicKeyProvider, PublicKeyProvider} from "@app/core/authentication/crypto/public-key-provider";

export interface ICryptoCradle {
  jwtGenerator: JWTGenerator;
  privateKeyProvider: PrivateKeyProvider;
  publicKeyProvider: PublicKeyProvider;
}

const registerCrypto = (container: AwilixContainer<ICryptoCradle>): void => {
  container.register({
    jwtGenerator: asFunction(({appConfig}) => {
      return new JWTGenerator(appConfig.jwtIssuer, appConfig.jwtAudience);
    }),
    privateKeyProvider: asFunction(({appConfig}) => {
      return new FilePrivateKeyProvider(appConfig.privateKeyPath, appConfig.privateKeyPassword);
    }),
    publicKeyProvider: asFunction(({appConfig}) => {
      return new FilePublicKeyProvider(appConfig.publicKeyPath);
    }),
  });
};

export default registerCrypto;
