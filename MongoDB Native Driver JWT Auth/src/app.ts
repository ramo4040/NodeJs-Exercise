import "reflect-metadata";
import { env } from "@/src/core/Config/env";
import Server from "@src/server";
import container from "./core/Config/inversify.config";
import { TYPES } from "./core/Constants/types";
import IRoutes from "./core/Interfaces/IRoutes";
import { IMongoDbConfig } from "./core/Interfaces/IMongodb.config";

async function main(): Promise<void> {
  const mongoDB = container.get(TYPES.MongoDb) as IMongoDbConfig;
  await mongoDB.connectMongoDB();

  const routes = container.get(TYPES.UserRoutes) as IRoutes;
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
