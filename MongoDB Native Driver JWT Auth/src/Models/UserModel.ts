import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export class UserModel {
  constructor(
    private email: string,
    private password: string,
    private _id?: ObjectId,
  ) {
    this._id = new ObjectId();
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
