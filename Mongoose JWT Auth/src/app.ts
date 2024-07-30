import 'reflect-metadata'
import container from './core/config/inversify.config'
import TYPES from './core/constants/TYPES'
import IBaseRoutes from './core/interfaces/IRoutes'
import env from './core/config/env'
import Server from './server'

const main = async (): Promise<void> => {
  try {
    const BaseRouter = container.get(TYPES.BaseRoutes) as IBaseRoutes
    const server = new Server(
      {
        port: env.port,
        apiPrefix: env.apiPrefix,
      },
      BaseRouter,
    )

    await server.mongodbConnect()

    void server.start()
  } catch (error) {
    console.log((error as Error).message)
  }
}

main()
