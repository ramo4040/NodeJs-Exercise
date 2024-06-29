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

  async createUser(user: UserModel): Promise<UserModel> {
    await this.collection.insertOne(user);
    return user;
  }

  async getAllUsers(): Promise<UserModel[]> {
    const users = await this.collection.find({}).toArray();
    return users.map(
      (user) =>
        new UserModel(user._id, user.userName, user.email, user.password)
    );
  }

  async getUserById<T>(id: ObjectId): Promise<T> {
    const user = await this.collection.findOne({ _id: id });
    return user as T;
  }

  async deleteUser<T>(id: ObjectId): Promise<T> {
    const result = await this.collection.findOneAndDelete({ _id: id });
    return result as T;
  }

  async updateUser(id: ObjectId, user: UserModel) {
    const result = await this.collection.findOneAndUpdate(
      { _id: id },
      { $set: user }
    );
    return result;
  }
}
