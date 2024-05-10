import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
      autoCreate: true,
      autoIndex: true,
    });
    console.log("DB connected");
  } catch (except) {
    console.log("Error connecting database: ", except);
    process.exit(1);
  }
};
