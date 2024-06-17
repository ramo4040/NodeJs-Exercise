import joi from "joi";
import { Request, Response } from "express";
import CompanyValidation from './CompanyValidation.js';

const scheme = joi.object({
  prenom: joi
    .string()
    .regex(/^[a-zA-Z]+$/)
    .min(3)
    .max(50)
    .required()
    .label("Prenom"),
  nom: joi
    .string()
    .regex(/^[a-zA-Z]+$/)
    .min(3)
    .max(50)
    .required()
    .label("Nom"),
  adresse: joi.string().max(100).required(),
  ville: joi
    .string()
    .regex(/^[a-zA-Z]+$/)
    .max(50)
    .required(),
  numeroTelephone: joi.string().required().label("Numero Telephon"),
  email: joi.string().email().required(),
  entrepriseId: joi.number().required().label("Id entreprise"),
});

const clientValidator = async (req: Request, res: Response, next) => {
  const data = req.body
  const { error } = scheme.validate(data);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const company = await CompanyValidation.checkCompany(data)

  if (!company) {
    return res.status(400).send({ message: `Company id ${data.entrepriseId} does not exist` });
  }
  
  next();
};

export default clientValidator;
