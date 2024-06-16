import express from "express";

import { ClientRoutes } from "./Routes/ClientRoutes.js";

const app = express();

app.use(express.json());

app.use(ClientRoutes);

export default app;
