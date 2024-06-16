import ClientService from "../Services/ClientService.js";
import { Request, Response } from "express";

class ClientController {
  async getAllClients(res: Response) {
    const clients = await ClientService.getAllClients();

    if (clients.length == 0) {
      res.status(404).send({ message: "Resource not found" });
      return;
    }

    res.status(200).send(clients);
  }

  async getClientById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const client = await ClientService.getClientById(id);

    if (!client) {
      res.status(404).send({ message: `Client id : ${id} Not Found` });
      return;
    }

    res.status(200).send(client);
  }

  async deleteClient(req: Request, res: Response) {
    const id = Number(req.params.id);
    const client = await ClientService.deleteClient(id);
    if (!client) {
      res.status(404).send({ message: `Client id : ${id} Not Found` });
      return;
    }
    res.status(200).send({ message: `Client id ${id} has been deleted` });
  }

  async updateClient(req: Request, res: Response) {
    const id = Number(req.params.id);
    const client = await ClientService.updateClient(id, req.body);
    res.status(200).send(client);
  }
}

export default new ClientController();
