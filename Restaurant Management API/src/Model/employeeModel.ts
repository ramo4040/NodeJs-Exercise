import prisma from "../Config/pirsma";

const getEmployeesByEmail = async (email) => {
  const employee = await prisma.employees.findFirst({
    where: { email: email },
  });

  return employee;
};

const createEmployee = async (data) => {
  return await prisma.employees.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      restaurantID: Number(data.restaurantID),
      role: data.role,
      image: data.image,
    },
  });
};

export { getEmployeesByEmail, createEmployee };
