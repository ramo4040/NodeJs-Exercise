import { Collection, MongoClient } from "mongodb";
import { injectable } from "inversify";
import { IMongoConfig } from "../Interfaces/IMongoConfig.js";
import { config } from "dotenv";
config();

@injectable()
export class MongoConfig implements IMongoConfig {
  private client: MongoClient;

  async connectToDb(uri: string): Promise<void> {
    try {
      this.client = new MongoClient(uri);
      await this.client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.dir(error);
    }
  }

  async getCollection(db, collection): Promise<Collection> {
    if (!this.client) {
      throw new Error("Database not connected");
    }
    return this.client.db(db).collection(collection);
  }
}
