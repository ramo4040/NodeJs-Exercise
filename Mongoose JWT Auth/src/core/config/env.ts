import 'dotenv/config'
import { get } from 'env-var'

const env = {
  port: get('PORT').required().asPortNumber(),
  apiPrefix: get('API_PREFIX').default('/api/v1').required().asString(),
  mongodb_uri: get('MONGODB_URI').required().asUrlString(),

  ACCESS_TOKEN: {
    secret: get('AUTH_ACCESS_TOKEN_SECRET').required().asString(),
    expire: get('AUTH_ACCESS_TOKEN_EXPIRY').required().asString(),
  },
  REFRESH_TOKEN: {
    secret: get('AUTH_REFRESH_TOKEN_SECRET').required().asString(),
    expire: get('AUTH_REFRESH_TOKEN_EXPIRY').required().asString(),
  },
}
export default env
