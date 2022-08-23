import {config} from 'dotenv';
import containerConfiguration from '@app/container';
import logger from '@app/common/logger';

config()
const container = containerConfiguration()
const expressApp = container.cradle.express;
const port = container.cradle.appConfig.port;
const db = container.cradle.db;
const database = container.cradle.appConfig.dataBase;

const start = async (): Promise<void> => {
  let maxRetries = 20;
  while(maxRetries){
    try {
      await db.authenticate();
      await db.sync();
      logger.info(`${database.name} database connected and synchronized at host: ${database.host}:${database.port}`);
      expressApp.listen(port, () => {
        logger.info(`starting server on port: ${port}`);
      });
      break;
    } catch (error) {
      logger.info(`wait to connect database due to: ${error}`);
      await sleep(2);
      maxRetries--;
    }
  }
};

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

void start();
