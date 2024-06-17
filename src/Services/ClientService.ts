import prisma from "../Models/prisma.js";

class ClientService {
  async getAllClients() {
    return await prisma.client.findMany().finally(() => prisma.$disconnect());
  }

  async getClientById(id: number) {
    return await prisma.client
      .findFirst({
        where: { id: id },
      })
      .finally(() => prisma.$disconnect());
  }

  async addClient(data) {
    try {
      return await prisma.client
        .create({
          data: {
            prenom: data.prenom,
            nom: data.nom,
            adresse: data.adresse,
            ville: data.ville,
            numeroTelephone: data.numeroTelephone,
            email: data.email,
            entrepriseId: data.entrepriseId,
          },
        })
        .finally(() => prisma.$disconnect());
    } catch (error) {
      return null;
    }
  }

  async deleteClient(id: number) {
    try {
      return await prisma.client
        .delete({
          where: { id: id },
        })
        .finally(() => prisma.$disconnect());
    } catch (error) {
      return null; // if client not found
    }
  }

  async updateClient(id: number, data) {
    try {
      return await prisma.client
        .update({
          where: { id: id },
          data: {
            prenom: data.prenom,
            nom: data.nom,
            adresse: data.adresse,
            ville: data.ville,
            numeroTelephone: data.numeroTelephone,
            email: data.email,
            entrepriseId: data.entrepriseId,
          },
        })
        .finally(() => prisma.$disconnect());
    } catch (error) {
      return null; // if client not found
    }
  }
}

export default new ClientService();
