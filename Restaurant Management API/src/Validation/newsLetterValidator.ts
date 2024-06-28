import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const scheme = Joi.object({
  email: Joi.string().email().required(),
});

export const newsLetterValidator = async (req : Request , res: Response,next:NextFunction) => {
    const {error} = scheme.validate(req.body)

    if (error) {
        return res.status(429).send({error:error.details[0].message})
    }

    next()
}