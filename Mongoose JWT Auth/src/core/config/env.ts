import 'dotenv/config'
import { get } from 'env-var'

const env = {
  port: get('PORT').required().asPortNumber(),
  apiPrefix: get('API_PREFIX').default('/api/v1').required().asString(),
  mongodb_uri: get('MONGODB_URI').required().asUrlString(),
  jwt_token: get('JWT_TOKEN').required().asString(),
}
export default env
