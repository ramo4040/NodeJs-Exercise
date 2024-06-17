import Joi from "joi";
import { Request, Response } from "express";

const numberValidator = Joi.number().required();

const productSchema = Joi.object({
  quantite: numberValidator.label("quantite"),
  prix: numberValidator.label("prix"),
  produitId: numberValidator.label("Produit Id"),
});

const scheme = Joi.object({
  clientId: numberValidator.label("Client Id"),
  entrepriseId: numberValidator.label("Company Id"),
  products: Joi.array().items(productSchema).required().label("Products"),
});

const invoiceValidator = (req: Request, res: Response, next) => {
  const data = req.body;
  const { error } = scheme.validate(data);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

export default invoiceValidator;
