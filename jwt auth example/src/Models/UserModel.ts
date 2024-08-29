import prisma from "../Config/prisma";


export class UserModel {
  static async createUser(data) {
    try {
      return await prisma.user
        .create({
          data: {
            email: data.email,
            password: data.password,
          },
        })
        .then((user) => Object.assign(user, { status: true }));

    } catch (error) {
      if (error.code == "P2002") {
        return { status: false, message: "Email already exists" };
      }
    } finally {
      await prisma.$disconnect();
    }
  }

  static async findUserByEmail(email) {
    return await prisma.user
      .findFirst({
        where: {
          email: email,
        },
      })
      .finally(() => prisma.$disconnect());
  }
}
