import "reflect-metadata";
import { TYPES } from './core/Constants/types';
import container from './core/config/inversify.config';
import Server from './server';
import { env } from './core/config/env';
import { IMongoDbConfig } from './core/Interfaces/IMongodb.config';
import IRoutes from './core/Interfaces/IRoutes';


async function main(): Promise<void> {
  const mongoDB = container.get(TYPES.MongoDb) as IMongoDbConfig;
  await mongoDB.connectMongoDB();

  const routes = container.get(TYPES.BaseRoutes) as IRoutes;
  const server = new Server(
    {
      port: env.PORT,
      apiPrefix: env.DEFAULT_API_PREFIX,
    },
    routes
  );

  void server.start();
}

main();
