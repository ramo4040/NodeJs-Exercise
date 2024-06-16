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

  async deleteClient(id: number) {
    try {
      return await prisma.client.delete({
        where: { id: id },
      });
    } catch (error) {
      return null; // if user not found
    }
  }

  async updateClient(id: number , data) {
    return await prisma.client.update({
      where: { id: id },
      data: {
        prenom: data.prenom,
        nom: data.nom,
        adresse: data.adresse,
        ville: data.ville,
        numeroTelephone: data.numeroTelephone,
        email: data.email,
        entreprise: data.entreprise,
      }
    });
  }
}

export default new ClientService();
