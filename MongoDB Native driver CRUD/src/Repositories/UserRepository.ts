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

  async getUserById(id: ObjectId): Promise<UserModel> {
    const user = await this.collection.findOne({ _id: id });
    return user as UserModel;
  }
}
