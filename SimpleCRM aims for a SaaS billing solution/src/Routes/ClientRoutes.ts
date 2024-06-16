import { Router } from "express";
import ClientController from "../Controllers/ClientController.js";

const router = Router();

router.get("/clients", ClientController.getAllClients);
router.get("/clients/:id(\\d+)", ClientController.getClientById);
router.post("/clients", ClientController.addClient);
router.delete("/clients/:id(\\d+)", ClientController.deleteClient);
router.put("/clients/:id(\\d+)", ClientController.updateClient);

export { router as ClientRoutes };
