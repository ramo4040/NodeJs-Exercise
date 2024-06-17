import app from "./app.js";
import { config } from "dotenv";
config();

function startServer() {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server runing at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
