import { Types } from "mongoose";

export class FileResponseDTO {
  constructor(
    public id: string,
    public name: string,
    public savedName: string,
    public url: string,
    public topicId: string | Types.ObjectId,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}