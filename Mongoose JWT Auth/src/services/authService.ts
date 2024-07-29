import TYPES from "@/core/constants/TYPES";
import {
  IAuthService,
  IRegistrationData,
  IStatusMessage,
} from "@/core/interfaces/IAuth";
import { IUser, IUserRepository } from "@/core/interfaces/IUser";
import { IPasswordHasher } from "@/core/interfaces/IUtils";
import { inject, injectable } from "inversify";

@injectable()
export default class AuthService implements IAuthService {
  /**
   * @param PasswordHasher class responsible for password hashing and comparison
   * @param UserRepository abstraction layer to store data
   */
  constructor(
    @inject(TYPES.PasswordHasher) private PasswordHasher: IPasswordHasher,
    @inject(TYPES.UserRepository) private UserRepository: IUserRepository<IUser>
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
      data.password = await this.PasswordHasher.hashPassword(data.password);
      // create user in database
      const savedUser = await this.UserRepository.createUser(data);
      // return promise object
      return {
        status: 201,
        message: "Registration successful!",
        user: savedUser,
      };
    } catch (error: any) {
      return await this.handleRegistrationError(error);
    }
  }

  /**
   * Handles errors that occur during user registration.
   * @param error - error object
   * @returns promise object IStatusMessageIStatusMessage
   */
  private async handleRegistrationError(error: any): Promise<IStatusMessage> {
    // Handle username or email exist!
    if (error.keyPattern?.username) {
      return { status: 409, user: null, message: "Username already exists" };
    } else if (error.keyPattern?.email) {
      return { status: 409, user: null, message: "Email already exists" };
    }
    // Return a generic error message if there is a problem saving the user
    return {
      status: 500,
      user: null,
      message: "An error occurred during registration",
    };
  }
}
