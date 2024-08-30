import { Container } from "inversify";
import { TYPES } from "../Constants/types";
import MongoDb from "./mongodb.config";
import UserService from "@/services/UserServices";
import UserRepository from "@/repositories/UserRepository";
import UserController from "@/controllers/UserController";
import UserValidation from "@/validator/userValidation";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { UserRoutes } from "@/routes/UserRoutes";
import BaseRoutes from "@/routes/BaseRoutes";
import ProtectedRoutes from "@/routes/ProtectedRoutes";


const container = new Container();

container.bind(TYPES.MongoDb).to(MongoDb).inSingletonScope();
container.bind(TYPES.UserRepository).to(UserRepository);
container.bind(TYPES.UserService).to(UserService);
container.bind(TYPES.UserController).to(UserController);
container.bind(TYPES.UserValidation).to(UserValidation);

container.bind(TYPES.AuthMiddleware).to(AuthMiddleware);

container.bind(TYPES.UserRoutes).to(UserRoutes);
container.bind(TYPES.BaseRoutes).to(BaseRoutes);
container.bind(TYPES.ProtectedRoutes).to(ProtectedRoutes);

export default container;
