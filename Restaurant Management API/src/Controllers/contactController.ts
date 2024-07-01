import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const contactController = (req: Request, res: Response) => {
  res.render("contact");
};

export const submitContact = (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  const transport = nodemailer.createTransport({
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
    name: name,
    from: email,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: message,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.redirect("/contact");
};
