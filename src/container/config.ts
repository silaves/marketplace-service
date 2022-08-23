import {asValue, AwilixContainer} from 'awilix';
import {parseInt} from 'lodash';


type DatabaseConfig = {
  name?: string,
  user?: string;
  password?: string;
  url?: string;
  dialect?: string;
  host?: string;
}

export type Configuration = {
  port: number;
  redisUrl: string;
  dataBase: DatabaseConfig;
  jwtIssuer: string;
  jwtAudience: string;
  privateKeyPath: string;
  privateKeyPassword: string;
}

export interface IConfigCradle {
  appConfig: Configuration
}

const registerConfiguration = (container: AwilixContainer<IConfigCradle>): void => {
  container.register({
    appConfig: asValue({
      port: parseInt(process.env.PORT!),
      redisUrl: process.env.REDIS_URL,
      dataBase: {
        name: process.env.MYSQL_DATABASE_NAME,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        url: process.env.MYSQL_HOST,
        dialect: process.env.DB_DIALECT,
        host: process.env.MYSQL_HOST,
      },
      jwtIssuer: process.env.JWT_ISSUER,
      jwtAudience: process.env.JWT_AUDIENCE,
      publicKeyPath: process.env.JWT_PUBLIC_KEY_PATH,
      privateKeyPath: process.env.JWT_PRIVATE_KEY_PATH,
      privateKeyPassword: process.env.JWT_PRIVATE_KEY_PASSWORD,
    }),
  });
}

export default registerConfiguration;