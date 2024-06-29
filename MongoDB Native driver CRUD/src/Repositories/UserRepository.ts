import { inject, injectable } from "inversify";
import { IUserRepository } from "../Interfaces/IUserRepository.js";
import { UserModel } from "../Models/UserModel.js";
import TYPES from "../Config/types.js";
import { IMongoConfig } from "../Interfaces/IMongoConfig.js";
import { Collection } from "mongodb";

@injectable()
export class UserRepository implements IUserRepository {
  private collection: Collection;

  constructor(@inject(TYPES.MongoConfig) private mongoConfig: IMongoConfig) {
    this.connect();
  }

  async connect() {
    const client = await this.mongoConfig.getDb();
    this.collection = client.db("mongoTp").collection("Users");
  }

  async createUser(user: UserModel): Promise<UserModel> {
    await this.collection.insertOne(user);
    this.mongoConfig.closeConnection();
    return user;
  }
}
