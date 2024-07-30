export interface IPasswordHasher {
  hashPassword(password: string): Promise<string>
  comparePassword(password: string, hashedPwd: string): Promise<boolean>
}
