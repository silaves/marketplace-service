import IORedis, {Redis} from 'ioredis';
import {asFunction, AwilixContainer, Lifetime} from 'awilix';
import {initializeDB} from "@app/framework/db/sequelize";

export interface IDatabaseCradle {
  db: any;
  redis: Redis;
}

function registerDatabase(container: AwilixContainer<IDatabaseCradle>): void {
  container.register({
    db: asFunction(initializeDB).singleton(),
    redis: asFunction(({appConfig}) => {
      return new IORedis(appConfig.redisUrl);
    }).setLifetime(Lifetime.SINGLETON),
  });
}

export default registerDatabase;
