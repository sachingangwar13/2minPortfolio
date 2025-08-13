import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: "../.env"
})

const uri = process.env.MONGODB_URL;
const DB_NAME = process.env.DB_NAME

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${uri}${DB_NAME}`)

        console.log(`\n MongoDB connected! DB host: ${connectionInstance.connection.host}`);
         
    } catch (error) {
        console.log(uri);
        console.log(DB_NAME);
        
        console.log("MongoDB connection error" , error);
        process.exit(1);
    }
}

export default connectDB