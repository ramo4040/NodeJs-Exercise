import "reflect-metadata";
import env from "./core/config/env";
import Server from "./server";

const main = async (): Promise<void> => {
  const server = new Server({
    port: env.port,
    apiPrefix: env.apiPrefix,
  });

  void server.start();
};

main();
