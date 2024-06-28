import prisma from "../Config/pirsma";

const getRestaurantInfo = async () => {
  return await prisma.restaurant.findFirst();
};



export { getRestaurantInfo };
