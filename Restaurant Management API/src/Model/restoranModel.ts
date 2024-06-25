import prisma from "../Config/pirsma";

export const getRestaurantInfo = async () => {
  return await prisma.restoran.findFirst();
};

