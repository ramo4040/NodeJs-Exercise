import { injectable, inject } from "inversify";
import { TYPES } from "@src/core/Constants/types";
import { type Collection } from "mongodb";
import { IMongoDbConfig } from "../core/Interfaces/IMongodb.config";
import IUserRepository from "../core/Interfaces/IUserRepository";
import { type UserModel } from "../Models/UserModel";

@injectable()
export default class UserRepository implements IUserRepository {
  private readonly db: Collection;

  constructor(@inject(TYPES.MongoDb) private mongodb: IMongoDbConfig) {
    this.db = this.mongodb.client.db("mongoTp").collection("Users");
  }

  async createUser<T>(user: T): Promise<T | null> {
    try {
      const result = await this.db.insertOne(user as Document);
      return { _id: result.insertedId, ...user };
    } catch (error: any) {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    const result = await this.db.findOne({ email });
    return result as UserModel | null;
  }
}
