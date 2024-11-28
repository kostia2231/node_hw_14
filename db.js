import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log("db connected");
  } catch (err) {
    console.error("error connecting db", err.message);
    process.exit(1);
  }
};
