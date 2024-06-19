import { config } from "dotenv";
import app from "./app.js";
config();

function startServer() {
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server Listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}


startServer()
