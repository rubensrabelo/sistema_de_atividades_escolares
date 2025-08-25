import { Types } from "mongoose";

export class CourseResponseDTO {
  id: string;
  title: string;
  description?: string;
  active: boolean;
  createBy: string | Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    title: string,
    active: boolean,
    createBy: string | Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    description?: string
  ) {
    this.id = id,
    this.title = title,
    this.active = active,
    this.createBy = createBy,
    this.createdAt = createdAt,
    this.updatedAt = updatedAt
    
    if(description)
      this.description = description
  }
}