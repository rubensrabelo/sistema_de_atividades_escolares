import { Schema, model } from "mongoose";
import { IFileDocument } from "./interfaces/file.interface";

const FileSchema = new Schema<IFileDocument>(
  {
    name: { type: String, required: true },
    savedName: { type: String, required: true },
    url: { type: String, required: true },
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  },
  { timestamps: true }
);

export const File = model<IFileDocument>("File", FileSchema);