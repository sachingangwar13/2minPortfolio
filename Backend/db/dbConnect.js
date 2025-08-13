import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error("MONGODB_URI is not defined");
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
