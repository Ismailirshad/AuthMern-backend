import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected successfully");
    }catch(error){
        console.error("Failed to connect to MongoDB",error);
    }
}
export default connectDb;