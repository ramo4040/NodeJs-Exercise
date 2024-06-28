import { MongoClient } from "mongodb";
import { injectable } from "inversify";
import { IMongoConfig } from "../interfaces/IMongoConfig.js";
import { config } from "dotenv";
config();

@injectable()
export class MongoConfig implements IMongoConfig {
  private client: MongoClient;

  async getDb(): Promise<MongoClient> {
    try {
      this.client = new MongoClient(process.env.MONGODB_URI);
      await this.client.connect();
      return this.client;
    } catch (error) {
      console.dir(error);
    }
  }

  async closeConnection(): Promise<void> {
    await this.client.close();
  }
}
