import cookieParser from "cookie-parser";
import express from "express";

interface IOptions {
  port: number;
  apiPrefix: string;
}

export default class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly apiPrefix: string;

  constructor(options: IOptions) {
    this.port = options.port;
    this.apiPrefix = options.apiPrefix;
  }

  async start(): Promise<void> {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.listen(this.port, () => {
      console.log(`Server running on port http://localhost:${this.port}`);
    });
  }
}
