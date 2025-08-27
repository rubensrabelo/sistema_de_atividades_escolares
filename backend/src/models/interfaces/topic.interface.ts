import { Types, Document } from "mongoose";
import { TopicType } from "../enums/topic-type.enum";

export interface ITopic {
    title: string;
    description: string;
    type: TopicType;
    course: string | Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITopicDocument extends ITopic, Document {
    _id: Types.ObjectId;
}