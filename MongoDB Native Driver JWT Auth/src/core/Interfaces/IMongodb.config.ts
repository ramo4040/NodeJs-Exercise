import { MongoClient } from "mongodb";

export interface IMongoDbConfig {
  connectMongoDB(): Promise<void>;
  get client(): MongoClient;
}
