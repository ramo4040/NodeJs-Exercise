import prisma from "../Config/pirsma";

const getEmail = async (email) => {
  return await prisma.newsLetter.findFirst({
    where: { email: email },
  });
};

const addEmail = async (email) => {
  return await prisma.newsLetter.create({
    data: {
      email: email,
    },
  });
};

export { getEmail, addEmail };
