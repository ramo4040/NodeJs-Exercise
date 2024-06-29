import TYPES from "./types.js";
import { App } from "../app.js";
import { Container } from "inversify";
import { MongoConfig } from "./mongodb.config.js";
import { UserController } from "../Controllers/UserController.js";
import { UserRoutes } from "../Routes/UserRoutes.js";
import { UserService } from "../Services/UserService.js";
import { UserRepository } from "../Repositories/UserRepository.js";

const container = new Container();

container.bind(TYPES.App).to(App);

container.bind(TYPES.MongoConfig).to(MongoConfig).inSingletonScope();
container.bind(TYPES.UserRoutes).to(UserRoutes);
container.bind(TYPES.UserController).to(UserController);
container.bind(TYPES.UserRepository).to(UserRepository);
container.bind(TYPES.UserService).to(UserService);

export { container };
