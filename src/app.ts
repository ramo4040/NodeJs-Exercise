import express from "express";

import { ClientRoutes, InvoiceRoutes } from "./Routes/Routes.js";

const app = express();

app.use(express.json());

app.use(InvoiceRoutes);
app.use(ClientRoutes);

export default app;
