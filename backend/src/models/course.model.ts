import { Schema, model, Document, Types } from "mongoose";
import { ICourse } from "./interfaces/course.interface";

export interface CourseDocument extends ICourse, Document {
  _id: Types.ObjectId;
}

const courseSchema = new Schema<CourseDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true },
    createBy:   { type: Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default model<CourseDocument>("Course", courseSchema);
