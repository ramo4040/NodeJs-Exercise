import { type Router } from 'express'

export default interface IBaseRoutes {
  router: Router
  registerRoutes(): void
}
