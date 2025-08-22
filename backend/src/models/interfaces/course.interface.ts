import { Types, Document } from "mongoose";

export interface ICourse {
  title: string;
  description?: string;
  active: boolean;
  createBy: string | Types.ObjectId;
  students?: string | Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourseDocument extends ICourse, Document { }
