import prisma from "../Config/pirsma";

const getCategories = async () => {
  return await prisma.category.findMany();
};

export { getCategories };
