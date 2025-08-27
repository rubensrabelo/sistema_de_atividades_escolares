import { Schema, model } from "mongoose";
import { ITopicDocument } from "./interfaces/topic.interface";
import { TopicType } from "./enums/topic-type.enum";

const TopicSchema = new Schema<ITopicDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { 
      type: String, 
      enum: Object.values(TopicType), 
      required: true 
    },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  { timestamps: true }
);

export const Topic = model<ITopicDocument>("Topic", TopicSchema);
