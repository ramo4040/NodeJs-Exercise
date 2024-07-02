import { MongoClient } from "mongodb";
import { IMongoDbConfig } from "../Interfaces/IMongodb.config";
import { injectable } from "inversify";
import { env } from './env';

@injectable()
export default class MongoDb implements IMongoDbConfig {
  private readonly mongoDB_uri: string;
  private Mongoclient: MongoClient;

  constructor() {
    this.mongoDB_uri = env.MONGODB_URI;
    this.Mongoclient = new MongoClient(this.mongoDB_uri);
  }

  async connectMongoDB(): Promise<void> {
    try {
      await this.Mongoclient.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  public get client(): MongoClient {
    return this.Mongoclient;
  }
}
