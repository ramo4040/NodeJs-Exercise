import Joi from "joi";
import { NextFunction, Request, Response } from "express";

declare module "express" {
  interface Request {
    file: any;
  }
}

const scheme = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(40)
    .regex(/^[a-zA-Z]+$/)
    .required()
    .label("First Name"),
  lastName: Joi.string()
    .min(2)
    .max(40)
    .regex(/^[a-zA-Z]+$/)
    .required()
    .label("Last Name"),
  role: Joi.string()
    .required()
    .valid("CHEF", "RESTAURANT_MANAGER", "EMPLOYEE", "ADMIN"),
  restaurantID: Joi.number().required(),
  image: Joi.allow(),
});

interface CustomRequest extends Request {
  fileTypeError?: string;
}

const employeeValidator = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { error } = scheme.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  if (req.fileTypeError) {
    return res.status(400).send({ error: req.fileTypeError });
  }
  next();
};

export { employeeValidator };
