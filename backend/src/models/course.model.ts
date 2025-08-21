import { Schema, model, Document, Types } from "mongoose";
import { ICourse } from "./interfaces/course.interface";

export interface CourseDocument extends ICourse, Document {
  _id: Types.ObjectId;
}

const courseSchema = new Schema<CourseDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    createBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<CourseDocument>("Course", courseSchema);
