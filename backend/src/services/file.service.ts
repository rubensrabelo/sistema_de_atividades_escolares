import { FileResponseDTO } from "../dtos/file/file-response.dto";
import { FileUpdateDTO } from "../dtos/file/file-update.dto";
import { File } from "../models/File.model";
import { IFileDocument } from "../models/interfaces/file.interface";
import { FileNotFoundError } from "./exceptions/file-not-found.error";

export interface IFileUpload {
  originalName: string;
  fileName: string;
  topicId: string;
}

export class FileService {
    async upload({ originalName, fileName, topicId }: IFileUpload):
        Promise<FileResponseDTO> {
        const file: IFileDocument = new File({
            name: originalName,
            savedName: fileName,
            url: `/uploads/${fileName}`,
            topicId,
        });

        const fileSaved: IFileDocument = await file.save();
        return FileResponseDTO.fromDocument(fileSaved);
    }

    async update(id: string, data: FileUpdateDTO): Promise<FileResponseDTO> {
        const fileUpdated: IFileDocument | null = await File.findByIdAndUpdate(id, { $set: data }, { new: true });

        if (!fileUpdated)
            throw new FileNotFoundError();

        return FileResponseDTO.fromDocument(fileUpdated);
    }

    async delete(id: string): Promise<void> {
        const fileDeleted: IFileDocument | null = await File.findByIdAndDelete(id);

        if (!fileDeleted)
            throw new FileNotFoundError();
    }

    async getFilesByTopic(topicId: string): Promise<FileResponseDTO[]> {
        const files: IFileDocument[] = await File.find({ topicId });

        return files.map(FileResponseDTO.fromDocument)
    }
}