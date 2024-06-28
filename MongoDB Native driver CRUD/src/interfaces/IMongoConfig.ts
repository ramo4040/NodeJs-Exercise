import { MongoClient } from "mongodb";

export interface IMongoConfig {
  getDb(): Promise<MongoClient>;
  closeConnection(): Promise<void>;
}
