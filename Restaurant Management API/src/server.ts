import { config } from "dotenv";
import app from "./app";

config();

const startServer = () => {
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listinning on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
