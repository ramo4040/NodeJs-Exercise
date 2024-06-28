import { config } from "dotenv";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import * as newsLetterModel from "../Model/newsLetterModel";
config();

const create = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existemail = await newsLetterModel.getEmail(email);

  if (existemail) {
    return res.status(400).send({ error: "Email already exists" });
  }

  await newsLetterModel.addEmail(email);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.status(201).redirect("/");
};

export { create };
