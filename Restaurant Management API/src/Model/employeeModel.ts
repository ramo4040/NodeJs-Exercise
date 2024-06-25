import prisma from "../Config/pirsma";

const getEmployeesByEmail = async (email) => {
  return await prisma.employees.findFirst({
    where: { email: email },
  });
};

export { getEmployeesByEmail };
