import prisma from "../Models/prisma.js";

class CompanyValidation {
  async checkCompany(data) {
    const entreprise = await prisma.entreprise.findUnique({
      where: { id: data.entrepriseId },
    });
    return entreprise;
  }
}

export default new CompanyValidation();
