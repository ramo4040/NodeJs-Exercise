import { Request, Response } from "express";
import { getEmployeesByEmail } from "../Model/employeeModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminLogin = async (req: Request, res: Response) => {
  const body = req.body;
  const employee = await getEmployeesByEmail(body.email);

  if (employee && (await bcrypt.compare(body.password, employee.password))) {
    const token = jwt.sign(
      { employeeId: employee.id, employeeRole: employee.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1200000,
      })
      .status(200)
      .send({ message: "Login successful!" });
    return;
  }
  
  res.status(403).send({ message: "Invalid email or password" });
};

export { adminLogin };
