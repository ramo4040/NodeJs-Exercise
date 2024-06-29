import { ObjectId } from "mongodb";

export class UserModel {
  constructor(
    public _id: ObjectId,
    private userName: string,
    private email: string,
    private password: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
