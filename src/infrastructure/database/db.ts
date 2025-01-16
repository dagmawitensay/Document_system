import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI as string)
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("Failed to connect to mongodb: ", error)
        process.exit(1);
    }
}

export default connectDB;