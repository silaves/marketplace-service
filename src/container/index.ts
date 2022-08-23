import {IConfigCradle} from './config';
import {AwilixContainer, createContainer, InjectionMode} from 'awilix';
import registerConfiguration from "./config";
import registerUsecase, {IApiCradle} from "@app/container/usecase";
import registerStartUp, {IStartUpCradle} from "@app/container/startup";
import registerRoute, {IRouteCradle} from "@app/container/route";
import registerDatabase, {IDatabaseCradle} from "@app/container/persistance";
import registerCrypto, {ICryptoCradle} from "@app/container/crypto";

interface IContainerCradle extends IConfigCradle, IApiCradle, IStartUpCradle, IRouteCradle, IDatabaseCradle, ICryptoCradle {
}

const containerConfiguration = (): AwilixContainer<IContainerCradle> => {
  const container = createContainer<IContainerCradle>({
    injectionMode: InjectionMode.PROXY
  });

  registerConfiguration(container);
  registerCrypto(container);
  registerUsecase(container);
  registerRoute(container);
  registerDatabase(container);
  registerStartUp(container);

  return container;
}

export default containerConfiguration;