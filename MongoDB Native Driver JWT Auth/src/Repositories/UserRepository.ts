import { TYPES } from "@/core/Constants/types";
import { IMongoDbConfig } from "@/core/Interfaces/IMongodb.config";
import IUserRepository from "@/core/Interfaces/IUserRepository";
import { UserModel } from "@/models/UserModel";
import { injectable, inject } from "inversify";
import { Document, type Collection } from "mongodb";

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
