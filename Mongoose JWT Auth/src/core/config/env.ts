import "dotenv/config";
import { get } from "env-var";

const env = {
  port: get("PORT").required().asPortNumber(),
  apiPrefix: get("API_PREFIX").default("api/v1").required().asString(),
};
export default env;
