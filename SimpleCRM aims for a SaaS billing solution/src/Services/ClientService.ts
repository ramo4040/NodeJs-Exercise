import prisma from "../Models/prisma.js";

class ClientService {
  async getAllClients() {
    return await prisma.client.findMany();
  }

  async getClientById(id: number) {
    return await prisma.client.findFirst({
      where: { id: id },
    });
  }

  async addClient(data) {
    return await prisma.client.create({
      data: {
        prenom: data.prenom,
        nom: data.nom,
        adresse: data.adresse,
        ville: data.ville,
        numeroTelephone: data.numeroTelephone,
        email: data.email,
        entrepriseId: data.entrepriseId
      },
    });
  }

  async deleteClient(id: number) {
    try {
      return await prisma.client.delete({
        where: { id: id },
      });
    } catch (error) {
      return null; // if user not found
    }
  }

  async updateClient(id: number, data) {
    try {
      return await prisma.client.update({
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
      });
    } catch (error) {
      return null; // if user not found
    }
  }
}

export default new ClientService();
