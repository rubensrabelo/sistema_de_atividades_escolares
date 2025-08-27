import mongoose, { Schema, Model } from "mongoose";
import { IUserDocument } from "./interfaces/user.interface";
import { UserRole } from "./enums/user-role.enum";

const UserSchema = new Schema<IUserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STUDENT,
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUserDocument>("User", UserSchema);
