import { Collection } from "mongodb";

export interface IMongoConfig {
  connectToDb(uri: string): Promise<void>;
  getCollection(db, collection): Promise<Collection>;
}
