import express from "express";
import cookieparser from "cookie-parser";
import IRoutes from "./core/Interfaces/IRoutes";

interface ServerOptions {
  port: number;
  apiPrefix: string;
}

export default class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly apiPrefix: string;

  constructor(option: ServerOptions, private BaseRoutes: IRoutes) {
    this.port = option.port;
    this.apiPrefix = option.apiPrefix;
  }

  async start(): Promise<void> {
    this.app.use(express.json());
    this.app.use(cookieparser());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(this.apiPrefix, this.BaseRoutes.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port http://localhost:${this.port}`);
    });
  }
}
