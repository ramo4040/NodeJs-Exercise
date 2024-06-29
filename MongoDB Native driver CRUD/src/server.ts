import { App } from "./app.js";
import TYPES from "./Config/types.js";
import { container } from "./Config/inversify.config.js";

const app = container.get<App>(TYPES.App);

app.listen();
