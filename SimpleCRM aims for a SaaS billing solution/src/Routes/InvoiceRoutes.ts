import { Router } from "express";
import InvoiceController from "../Controllers/InvoiceController.js";

const routes = Router();

routes.post("/invoices", InvoiceController.addInvoices);

export { routes as InvoiceRoutes };
