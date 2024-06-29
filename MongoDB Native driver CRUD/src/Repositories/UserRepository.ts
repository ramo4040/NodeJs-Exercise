import { inject, injectable } from "inversify";
import { IUserRepository } from "../Interfaces/IUserRepository.js";
import { UserModel } from "../Models/UserModel.js";
import TYPES from "../Config/types.js";
import { IMongoConfig } from "../Interfaces/IMongoConfig.js";
import { Collection, ObjectId } from "mongodb";

@injectable()
export class UserRepository implements IUserRepository {
  private collection: Collection;

  constructor(@inject(TYPES.MongoConfig) private mongoConfig: IMongoConfig) {
    mongoConfig.connectToDb(process.env.MONGODB_URI);
    this.connect();
  }

  async connect() {
    this.collection = await this.mongoConfig.getCollection("mongoTp", "Users");
  }

  async createUser<T>(user: T): Promise<T> {
    await this.collection.insertOne(user);
    return user as T;
  }

  async getAllUsers<T>(): Promise<T[]> {
    const users = await this.collection.find({}).toArray();
    return users as T[]
  }

  async getUserById<T>(id: ObjectId): Promise<T> {
    const user = await this.collection.findOne({ _id: id });
    return user as T;
  }

  async deleteUser<T>(id: ObjectId): Promise<T> {
    const result = await this.collection.findOneAndDelete({ _id: id });
    return result as T;
  }

  async updateUser<T>(id: ObjectId, user: T): Promise<T> {
    const result = await this.collection.findOneAndUpdate(
      { _id: id },
      { $set: user }
    );
    return result as T;
  }
}
