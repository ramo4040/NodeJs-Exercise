import { Router } from "express";
import InvoiceController from "../Controllers/InvoiceController.js";
import invoiceValidator from '../Validations/InvoiceValidation.js';

const routes = Router();

routes.post("/invoices", invoiceValidator,InvoiceController.addInvoices);
routes.get("/invoices", InvoiceController.getAllInvoices);
routes.get("/invoices/:id(\\d+)", InvoiceController.getInvoiceById);
routes.delete("/invoices/:id(\\d+)", InvoiceController.deleteInvoice);

export { routes as InvoiceRoutes };
