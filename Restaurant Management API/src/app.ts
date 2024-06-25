import express from "express";
import path from "path";
import { homeRoutes, aboutRoutes, contactRoutes } from "./Routes/main";

const app = express();

app.use(express.static("public"));
app.use(express.json());
// Set EJS as the view engine
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname, "views"));

//routes
app.use(homeRoutes);
app.use(aboutRoutes);
app.use(contactRoutes);

export default app;
