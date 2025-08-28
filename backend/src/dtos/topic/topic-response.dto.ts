import { Types } from "mongoose";
import { TopicType } from "../../models/enums/topic-type.enum";

export class TopicResponseDTO {
    id: string;
    title: string;
    description?: string;
    type: TopicType;
    course_id: string | Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: string,
        title: string,
        type: TopicType,
        course_id: string | Types.ObjectId,
        createdAt: Date,
        updatedAt: Date,
        description?: string
      ) {
        this.id = id,
        this.title = title,
        this.type = type,
        this.course_id = course_id,
        this.createdAt = createdAt,
        this.updatedAt = updatedAt
        
        if(description)
          this.description = description
      }
}