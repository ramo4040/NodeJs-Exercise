import { Container } from 'inversify'
import TYPES from '../constants/TYPES'
import AuthRoutes from '@/routes/auth/authRoutes'
import AuthController from '@/controllers/authController'
import BaseRoutes from '@/routes/baseRoutes'
import AuthService from '@/services/authService'
import PasswordHasher from '@/utils/passwordHasher'
import UserRepository from '@/repositories/userRepository'
import AuthToken from '@/utils/authToken'
import AuthMiddleware from '@/middlewares/authMiddleware'

const container = new Container()

container.bind(TYPES.AuthRoutes).to(AuthRoutes)
container.bind(TYPES.AuthController).to(AuthController)
container.bind(TYPES.BaseRoutes).to(BaseRoutes)
container.bind(TYPES.AuthService).to(AuthService)
container.bind(TYPES.AuthMiddleware).to(AuthMiddleware)

//Utils
container.bind(TYPES.PasswordHasher).to(PasswordHasher)
container.bind(TYPES.AuthToken).to(AuthToken)

//user
container.bind(TYPES.UserRepository).to(UserRepository)

export default container
