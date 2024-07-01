import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const scheme = Joi.object({
  name: Joi.string()
    .min(2)
    .max(40)
    .regex(/^[a-zA-Z\s]+$/)
    .required()
    .label("Name"),
  email: Joi.string().email().required().label("Email"),
  message: Joi.string().min(10).required().label("Message"),
  subject: Joi.string().required(),
});

export const contactValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = scheme.validate(req.body);
  if (error) {
    res.status(422).send({ message: error.details[0].message });
    return;
  }

  next();
};
