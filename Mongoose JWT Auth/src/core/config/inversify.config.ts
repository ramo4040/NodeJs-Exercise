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
import RefreshTokenRepo from '@/repositories/refreshTokenRepo'
import AuthValidator from '@/validator/authValidator'
import NodeMailer from '@/utils/mailer'

const container = new Container()

container.bind(TYPES.AuthRoutes).to(AuthRoutes)
container.bind(TYPES.AuthController).to(AuthController)
container.bind(TYPES.BaseRoutes).to(BaseRoutes)
container.bind(TYPES.AuthService).to(AuthService)
container.bind(TYPES.AuthMiddleware).to(AuthMiddleware)

//Utils
container.bind(TYPES.PasswordHasher).to(PasswordHasher)
container.bind(TYPES.AuthToken).to(AuthToken)
container.bind(TYPES.NodeMailer).to(NodeMailer)

//user
container.bind(TYPES.UserRepository).to(UserRepository)
container.bind(TYPES.RefreshTokenRepo).to(RefreshTokenRepo)

// Validator
container.bind(TYPES.AuthValidator).to(AuthValidator)

export default container
