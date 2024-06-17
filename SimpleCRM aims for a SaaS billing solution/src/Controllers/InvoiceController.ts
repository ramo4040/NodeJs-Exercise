import { Request, Response } from "express";
import InvoiceService from "../Services/InvoiceService.js";

class InvoiceController {
  async addInvoices(req: Request, res: Response) {
    const data = req.body;

    const totalPrice = data.products.reduce((acc, e) => {
      const sum = (acc += e.prix * e.quantite);
      return sum;
    }, 0);
    data.montantTotal = totalPrice;

    const inovoice = await InvoiceService.addInvoice(data);
    res.send(inovoice);
  }

  async getAllInvoices(req: Request, res: Response) {
    const invoices = await InvoiceService.getAllInvoices();
    if (invoices.length == 0) {
      return res.status(404).send({ message: "Resource Not found" });
    }
    res.status(200).send(invoices);
  }

  async getInvoiceById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const invoice = await InvoiceService.getInvoiceById(id);
    if (!invoice) {
      return res.status(404).send({ message: `Invoice id ${id} Not Found` });
    }
    res.status(200).send(invoice);
  }

  async deleteInvoice(req: Request, res: Response) {
    const id = Number(req.params.id);
    const invoice = await InvoiceService.deleteInvoice(id);
    console.log(invoice);
    
    if (!invoice) {
      return res.status(404).send({ message: `Invoice id ${id} Not Found` });
    }
    res.status(200).send({ message: `Invoice id ${id} has been deleted` });
  }
}

export default new InvoiceController();
