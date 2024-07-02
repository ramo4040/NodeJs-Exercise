import { Container } from "inversify";
import { TYPES } from "@src/core/Constants/types";
import MongoDb from "./mongodb.config";
import UserRepository from "@/src/Repositories/UserRepository";
import UserService from "@/src/Services/UserServices";
import UserController from "@/src/controllers/UserController";
import { UserRoutes } from "@/src/Routes/UserRoutes";
import UserValidation from "@/src/Validations/userValidation";

const container = new Container();

container.bind(TYPES.MongoDb).to(MongoDb).inSingletonScope();
container.bind(TYPES.UserRepository).to(UserRepository);
container.bind(TYPES.UserService).to(UserService);
container.bind(TYPES.UserController).to(UserController);
container.bind(TYPES.UserRoutes).to(UserRoutes);
container.bind(TYPES.UserValidation).to(UserValidation);

export default container;
