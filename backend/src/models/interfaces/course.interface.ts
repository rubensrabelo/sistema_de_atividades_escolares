import { Types } from "mongoose";

export interface ICourse {
  title: string;
  description?: string;
  createBy: string | Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
