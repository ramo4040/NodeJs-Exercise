import prisma from "../Models/prisma.js";

class InvoiceService {
  async addInvoice(data) {
    return await prisma.facture.create({
      data: {
        date: new Date(),
        montantTotal: data.montantTotal,
        clientId: data.clientId,
        entrepriseId: data.entrepriseId,
        elements: {
          create: data.products,
        },
      },
    });
  }
}

export default new InvoiceService()