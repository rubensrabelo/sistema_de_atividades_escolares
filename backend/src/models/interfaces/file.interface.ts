import { Types, Document } from "mongoose";

export interface IFile {
    name: string;
    savedName: string;
    url: string;
    topicId: string | Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IFileDocument extends IFile, Document {
    _id: Types.ObjectId;
}