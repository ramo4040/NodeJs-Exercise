import "dotenv/config";
import { get } from "env-var";

const env = {
  port: get("PORT").required().asPortNumber(),
  apiPrefix: get("API_PREFIX").default("/api/v1").required().asString(),
  mongodb_uri: get("MONGODB_URI").required().asUrlString(),
};
export default env;
