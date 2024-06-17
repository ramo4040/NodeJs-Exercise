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
}

export default new InvoiceController();
