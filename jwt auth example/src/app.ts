import express from "express";
import { AuthRoutes } from "./Routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import limiter from "./Middleware/RateLimit.js";
class App {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.registerRoutes();
  }

  private config() {
    this.app.use("/auth/", limiter);
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
  }

  // Initialize all the routes of the application
  private registerRoutes(): void {
    this.app.use(AuthRoutes);
  }

  // Server will listen to this port
  public startServer() {
    try {
      const PORT = process.env.PORT || 3000;
      this.app.listen(PORT, () => {
        console.log(`App listening on port ===> http://localhost:${PORT}/`);
      });
    } catch (error) {
      console.error("Server could not be started", error);
      process.exit();
    }
  }
}

export default App;
