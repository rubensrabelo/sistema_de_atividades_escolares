import { Types } from "mongoose";
import { TopicType } from "../../models/enums/topic-type.enum";

export class TopicResponseDTO {
  constructor(
    public id: string,
    public title: string,
    public type: TopicType,
    public courseId: string | Types.ObjectId,
    public createdAt: Date,
    public updatedAt: Date,
    public description?: string
  ) { }
}