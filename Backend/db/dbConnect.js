import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URL;
console.log( uri);

const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error("MONGODB_URL is not defined");
    }

    const connectionInstance = await mongoose.connect(uri);
    console.log(
      `\n MongoDB connected! DB host: ${connectionInstance.connection.host}`
    );
    return connectionInstance;
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
