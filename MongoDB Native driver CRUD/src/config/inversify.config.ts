import "reflect-metadata";
import { Container } from "inversify";
import { MongoConfig } from "./mongodb.config.js";
import TYPES from "./types.js";

const container = new Container();
container.bind(TYPES.MongoConfig).to(MongoConfig).inSingletonScope();

export { container };
