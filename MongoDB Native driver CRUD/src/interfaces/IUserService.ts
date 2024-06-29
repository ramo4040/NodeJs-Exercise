import { UserModel } from '../Models/UserModel.js';


export interface IUserService {
    createUser(user: UserModel): Promise<UserModel>;
}