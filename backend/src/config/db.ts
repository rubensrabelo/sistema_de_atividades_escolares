import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/authdb");
        console.log("MongoDB connected!");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};