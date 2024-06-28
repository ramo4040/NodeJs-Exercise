import prisma from "../Config/pirsma";

const createMeal = async (data) => {
  return await prisma.meals.create({
    data: {
      ...data,
      price: Number(data.price),
      restaurantID: Number(data.restaurantID),
      categoryID: Number(data.categoryID),
    },
  });
};

const getAllMeals = async () => {
  return await prisma.meals.findMany();
};

export { createMeal, getAllMeals };
