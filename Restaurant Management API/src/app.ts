import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import {
  homeRoutes,
  aboutRoutes,
  contactRoutes,
  authRoutes,
  mealsRoutes,
} from "./Routes/main";
import { employeeRoutes } from "./Routes/employeeRoutes";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// Set EJS as the view engine
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname, "views"));

//page routes
app.use(homeRoutes);
app.use(aboutRoutes);
app.use(contactRoutes);

//employee routes
app.use(authRoutes);

app.use(employeeRoutes);
app.use(mealsRoutes);

export default app;
