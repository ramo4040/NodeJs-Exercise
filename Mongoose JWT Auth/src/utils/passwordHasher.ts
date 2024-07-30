import bcrypt from 'bcrypt'
import { injectable } from 'inversify'

/**
 * This class provides utility methods for  hashing and comparing passwords.
 */
@injectable()
export default class PasswordHasher {
  /**
   * Hashes password using bcrypt.
   * @param password - The password string
   * @returns A promise hashed password string.
   */
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }
  /**
   * Compares a given password with a hashed password.
   * @param password - The password string to compare.
   * @param hashedPwd - The hashed password string to compare.
   * @returns A promise that resolves to true if the passwords match, false otherwise.
   */
  async comparePassword(password: string, hashedPwd: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPwd)
  }
}
