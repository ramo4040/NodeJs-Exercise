import prisma from "../Models/prisma.js";

class InvoiceService {
  async addInvoice(data) {
    return await prisma.facture
      .create({
        data: {
          date: new Date(),
          montantTotal: data.montantTotal,
          clientId: data.clientId,
          entrepriseId: data.entrepriseId,
          elements: {
            create: data.products,
          },
        },
      })
      .finally(() => prisma.$disconnect());
  }

  async getAllInvoices() {
    return await prisma.facture.findMany().finally(() => prisma.$disconnect());
  }

  async getInvoiceById(id: number) {
    return await prisma.facture
      .findFirst({
        where: { id: id },
      })
      .finally(() => prisma.$disconnect());
  }

  async deleteInvoice(id: number) {
    try {
      await prisma.elementFacture.deleteMany({
        where: { factureId: id },
      });

      return await prisma.facture
        .delete({
          where: { id: id },
        })
        .finally(() => prisma.$disconnect());
    } catch (error) {
      return null;
    }
  }
}

export default new InvoiceService();
