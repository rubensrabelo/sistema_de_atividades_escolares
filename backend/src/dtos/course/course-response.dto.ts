import { Types } from "mongoose";

export class CourseResponseDTO {
  constructor(
    public id: string,
    public title: string,
    public active: boolean,
    public createBy: string | Types.ObjectId,
    public createdAt: Date,
    public updatedAt: Date,
    public description?: string
  ) { }
}