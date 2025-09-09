import { Schema, model } from "mongoose";
import { ICourseDocument } from "./interfaces/course.interface";

const courseSchema = new Schema<ICourseDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true },
    createBy:   { type: Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model<ICourseDocument>("Course", courseSchema);
