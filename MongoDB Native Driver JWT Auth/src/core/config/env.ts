import "dotenv/config";
import { get } from "env-var";

export const env = {
  PORT: get("PORT").required().asPortNumber(),
  DEFAULT_API_PREFIX: get("DEFAULT_API_PREFIX")
    .required()
    .default("/api/v1")
    .asString(),
  MONGODB_URI: get("MONGODB_URI").required().asUrlString(),
  JWT_SECRET_KEY: get("JWT_SECRET_KEY").required().asString(),
};
