import { env } from "@src/core/config/env";
import Server from "@src/server";

function main(): void {
  const server = new Server({
    port: env.PORT,
    apiPrefix: env.DEFAULT_API_PREFIX,
    mongoDB_uri: env.MONGODB_URI,
  });

  void server.start();
}

main();
