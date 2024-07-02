import express from "express";
import IRoutes from "./core/Interfaces/IRoutes";
import cookieparser from "cookie-parser";

interface ServerOptions {
  port: number;
  apiPrefix: string;
}

export default class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly apiPrefix: string;

  constructor(option: ServerOptions, private UserRoutes: IRoutes) {
    this.port = option.port;
    this.apiPrefix = option.apiPrefix;
  }

  async start(): Promise<void> {
    this.app.use(express.json());
    this.app.use(cookieparser());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(this.apiPrefix, this.UserRoutes.registerRoutes());

    this.app.listen(this.port, () => {
      console.log(`Server running on port http://localhost:${this.port}`);
    });
  }
}
