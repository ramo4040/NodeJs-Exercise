import env from '@/core/config/env'
import TYPES from '@/core/constants/TYPES'
import { IAuthService, IRegistrationData, IStatusMessage } from '@/core/interfaces/IAuth'
import { IRefreshTokenRepo, IUser, IUserRefreshToken, IUserRepository } from '@/core/interfaces/IUser'
import { IAuthToken, INodeMailer, IPasswordHasher } from '@/core/interfaces/IUtils'
import { inject, injectable } from 'inversify'

@injectable()
export default class AuthService implements IAuthService {
  /**
   * @param PasswordHasher class responsible for password hashing and comparison
   * @param UserRepository abstraction layer to store data
   * @param AuthToken Class provide jwt functionalities
   * @param RefreshTokenRepo abstraction layer to manage RefreshToken data
   */
  constructor(
    @inject(TYPES.PasswordHasher) private PasswordHasher: IPasswordHasher,
    @inject(TYPES.UserRepository)
    private UserRepository: IUserRepository<IUser>,
    @inject(TYPES.AuthToken) private AuthToken: IAuthToken,
    @inject(TYPES.RefreshTokenRepo) private RefreshTokenRepo: IRefreshTokenRepo<IUserRefreshToken>,
    @inject(TYPES.NodeMailer) private NodeMailer: INodeMailer,
  ) {}

  /**
   * Registers a new user.
   * @param data - object containing the users information
   * @returns return promise object IStatusMessage.
   * @throws error if the username or email already exists, or if there is a problem saving the user
   */

  async register(data: IRegistrationData): Promise<IStatusMessage> {
    try {
      // hash password
      data.password = await this.PasswordHasher.hashPassword(data.password)
      // create user in database
      await this.UserRepository.createUser(data)
      // send email verification
      await this.sendVerificationEmail(data.username, data.email)
      // return promise object
      return {
        success: true,
        status: 201,
        message: 'Registration successful!',
      }
    } catch (error: any) {
      return await this.handleRegistrationError(error)
    }
  }

  /**
   * Sends a verification email to the user.
   * @param username - The username of the user.
   * @param email - The email address of the user.
   * @returns Promise<void>
   */
  private async sendVerificationEmail(username: string, email: string): Promise<void> {
    const verifyEmailToken = await this.AuthToken.generateVerifyEmailToken(username)
    const verificationUrl = `http://localhost:3000/api/v1/auth/verify-email?token=${verifyEmailToken}`
    const mailoptions = {
      from: env.MAILER.user,
      to: email,
      subject: 'Verify Your Email',
      html: `<a href="${verificationUrl}">${verificationUrl}</a>`,
    }
    this.NodeMailer.sendMail(mailoptions)
  }

  /**
   * Handles errors that occur during user registration.
   * @param error - error object
   * @returns promise object IStatusMessageIStatusMessage
   */
  private async handleRegistrationError(error: any): Promise<IStatusMessage> {
    // Handle username or email exist!
    if (error.keyPattern?.username) {
      return { success: false, status: 409, user: null, message: 'Username already exists' }
    } else if (error.keyPattern?.email) {
      return { success: false, status: 409, user: null, message: 'Email already exists' }
    }
    // Return a generic error message if there is a problem saving the user
    return {
      success: false,
      status: 500,
      user: null,
      message: 'An error occurred during registration',
    }
  }

  /**
   *
   * @param data object containing the users information
   * @returns return promise object IStatusMessage.
   */
  async login(data: IRegistrationData): Promise<IStatusMessage> {
    const user = await this.UserRepository.findOne({ email: data.email })
    try {
      // if user exist
      if (user) {
        //validate password
        const isPasswordValid = await this.PasswordHasher.comparePassword(data.password, user.password)
        if (isPasswordValid) {
          //generate token
          const accessToken = await this.AuthToken.generateAccessToken(user)
          const refreshToken = await this.AuthToken.generateRefreshToken(user)

          // save refresb token
          await this.RefreshTokenRepo.create(user._id, refreshToken)

          //send response message
          return {
            success: true,
            status: 200,
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
            message: 'You have successfully logged in.',
          }
        }
      }

      //if email or passwrod incorrect
      return {
        success: false,
        status: 404,
        user: null,
        message: 'Username or Password incorrect.',
      }
    } catch (error) {
      //internal server error
      return {
        success: false,
        status: 500,
        user: null,
        message: 'An error occurred during authentication.',
      }
    }
  }

  async logout(accessToken: string): Promise<IStatusMessage> {
    const decode = await this.AuthToken.verify(accessToken, env.ACCESS_TOKEN.secret)

    if (decode) {
      const result = await this.RefreshTokenRepo.deleteByUserId(decode._id)
      console.log(result)
      if (result) {
        return {
          success: true,
          status: 200,
          message: 'You have successfully logged out!',
        }
      }
    }

    return {
      success: false,
      status: 404,
      message: 'Invalid refresh token.',
    }
  }

  /**
   *
   * @param verifyToken token generated when user register
   * @returns return promise object IStatusMessage.
   */
  async verifyEmail(verifyToken: string): Promise<IStatusMessage> {
    const decodeVmToken = await this.AuthToken.verify(verifyToken, env.VERIFY_EMAIL.secret)
    // check if token valid
    if (decodeVmToken) {
      // update verified
      const user = await this.UserRepository.update({ username: decodeVmToken.username }, { emailVerified: true })
      console.log(user)

      if (user.modifiedCount) {
        return {
          success: true,
          status: 200,
          message: 'Your email address has been successfully verified.',
        }
      }
    }
    return {
      success: false,
      status: 400,
      message: 'Invalid verification token.',
    }
  }

  async handleRefreshToken(token: string): Promise<IStatusMessage> {
    const refreshToken = await this.AuthToken.verify(token, env.REFRESH_TOKEN.secret)

    if (!refreshToken) {
      return {
        status: 401,
        success: false,
      }
    }

    const newRefreshToken = await this.AuthToken.generateRefreshToken(refreshToken)
    const isRefreshTokenValid = await this.RefreshTokenRepo.findByRefreshToken(token, newRefreshToken)

    // check if refresh token exist
    if (isRefreshTokenValid) {
      // Generate a new access
      const newAccessToken = await this.AuthToken.generateAccessToken(refreshToken)

      return {
        success: true,
        status: 200,
        refreshToken: newRefreshToken,
        accessToken: newAccessToken,
      }
    }

    // if (refresh - access) tokens not valid
    return {
      status: 401,
      success: false,
    }
  }
}
