import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import msgRouter from "./routes/msg.routes.js";
import userRouter from "./routes/user.routes.js";

import { dbconnect } from "./db/db.config.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRouter);
app.use("/api/v1/msg", msgRouter);
app.use("/api/v1/user", userRouter);

const PORT = process.env.PORT || 6000;

server.listen(PORT, (err) => {
  if (!err) {
    dbconnect();
    console.log(`Server is up at ${PORT}`);
  }
});
