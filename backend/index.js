import express from "express";
import dotenv from "dotenv";

import authRouter from "./routes/auth.routes.js";
import { dbconnect } from "./db/db.config.js";

dotenv.config();
const app = express();

app.use("/api/v1", authRouter);

const PORT = process.env.PORT || 6000;

app.listen(PORT, (err) => {
  if (!err) {
    dbconnect();
    console.log(`Server is up at ${PORT}`);
  }
});
