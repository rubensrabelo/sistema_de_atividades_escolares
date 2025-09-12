import { Types } from "mongoose";
import { IFileDocument } from "../../models/interfaces/file.interface";

export class FileResponseDTO {
  constructor(
    public id: string,
    public name: string,
    public savedName: string,
    public url: string,
    public topicId: string | Types.ObjectId,
    public createdAt: Date,
    public updatedAt: Date,
  ) { }

  static fromDocument(doc: IFileDocument): FileResponseDTO {
    return new FileResponseDTO(
      doc.id.toString(),
      doc.name,
      doc.savedName,
      doc.url,
      String(doc.topicId),
      doc.createdAt!,
      doc.updatedAt!,
    );
  }
}