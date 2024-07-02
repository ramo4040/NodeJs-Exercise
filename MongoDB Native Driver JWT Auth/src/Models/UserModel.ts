import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export class UserModel {
  constructor(
    public email: string,
    public password: string,
    public _id?: ObjectId,
  ) {
    this._id = new ObjectId();
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
