import prisma from "../Config/pirsma";

export const getRestoranInfo = async () => {
  return await prisma.restoran.findFirst();
};

