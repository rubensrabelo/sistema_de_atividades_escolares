import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "student" | "teacher";
};

const UserSchema = new Schema<IUser>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        role: {
            type: String,
            enum: ["student", "teacher"],
            default: "student",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);