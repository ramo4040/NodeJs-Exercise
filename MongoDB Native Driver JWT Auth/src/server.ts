import express from "express";
import { MongoClient } from "mongodb";

interface ServerOptions {
  port: number;
  apiPrefix: string;
  mongoDB_uri: string;
}

export default class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly mongoDB_uri: string;
  private readonly apiPrefix: string;

  constructor(option: ServerOptions) {
    this.port = option.port;
    this.apiPrefix = option.apiPrefix;
    this.mongoDB_uri = option.mongoDB_uri;
    
    this.connectMongoDB();
  }

  async start(): Promise<void> {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.listen(this.port, () => {
      console.log(`Server running on port http://localhost:${this.port}`);
    });
  }

  async connectMongoDB(): Promise<void> {
    try {
      const client = new MongoClient(this.mongoDB_uri);
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
}
