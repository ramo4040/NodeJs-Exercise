import prisma from "../Config/prisma.js";

export class UserModel {
  static async createUser(data) {
    return await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
  }

  static async findUserByEmail(email) {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
}
