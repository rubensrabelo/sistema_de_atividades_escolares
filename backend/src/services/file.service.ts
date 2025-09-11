import { FileCreateDTO } from "../dtos/file/file-create.dto";
import { FileResponseDTO } from "../dtos/file/file-response.dto";
import { FileUpdateDTO } from "../dtos/file/file-update.dto";
import { File } from "../models/file.model";
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

        return new FileResponseDTO(
            fileSaved.id.toString(),
            fileSaved.name,
            fileSaved.savedName,
            fileSaved.url,
            fileSaved.topicId.toString(),
            fileSaved.createdAt!,
            fileSaved.updatedAt!,
        );
    }

    async update(id: string, data: FileUpdateDTO): Promise<FileResponseDTO> {
        const fileUpdated: IFileDocument | null = await File.findByIdAndUpdate(id, { $set: data }, { new: true });

        if (!fileUpdated)
            throw new FileNotFoundError();

        return new FileResponseDTO(
            fileUpdated.id.toString(),
            fileUpdated.name,
            fileUpdated.savedName,
            fileUpdated.url,
            fileUpdated.topicId.toString(),
            fileUpdated.createdAt!,
            fileUpdated.updatedAt!,
        );
    }

    async delete(id: string): Promise<void> {
        const fileDeleted: IFileDocument | null = await File.findByIdAndDelete(id);

        if (!fileDeleted)
            throw new FileNotFoundError();
    }

    async getFilesByTopic(topicId: string): Promise<FileResponseDTO[]> {
        const files: IFileDocument[] = await File.find({ topicId });

        return files.map(
            file => new FileResponseDTO(
                file.id.toString(),
                file.name,
                file.savedName,
                file.url,
                file.topicId.toString(),
                file.createdAt!,
                file.updatedAt!,
            )
        );
    }
}