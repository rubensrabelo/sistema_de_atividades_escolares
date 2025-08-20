import mongoose, { Schema, Model } from "mongoose";
import { IUserDocument } from "./interfaces/user.interface";

const UserSchema = new Schema<IUserDocument>(
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
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User: Model<IUserDocument> = mongoose.model<IUserDocument>("User", UserSchema);

export default User;
