import cookieParser from 'cookie-parser'
import express from 'express'
import IBaseRoutes from './core/interfaces/IRoutes'
import mongoose, { ConnectOptions } from 'mongoose'
import env from './core/config/env'

interface IOptions {
  port: number
  apiPrefix: string
}
export default class Server {
  private readonly app = express()
  private readonly port: number
  private readonly apiPrefix: string

  constructor(
    options: IOptions,
    private BaseRouter: IBaseRoutes,
  ) {
    this.port = options.port
    this.apiPrefix = options.apiPrefix
  }

  async start(): Promise<void> {
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(express.urlencoded({ extended: true }))

    this.app.use(this.apiPrefix, this.BaseRouter.router)

    this.app.listen(this.port, () => {
      console.log(`Server running on port http://localhost:${this.port}`)
    })
  }

  async mongodbConnect(): Promise<void> {
    try {
      const clientOptions: ConnectOptions = {
        serverApi: { version: '1', strict: true, deprecationErrors: true },
      }

      await mongoose.connect(env.mongodb_uri, clientOptions)
      console.log('You successfully connected to MongoDB!')
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
