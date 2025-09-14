import { Response } from "express";

import { FileResponseDTO } from "../dtos/file/file-response.dto";
import { FileUpdateDTO } from "../dtos/file/file-update.dto";
import { AuthRequest } from "../middlewares/auth.middleware";
import { FileNotFoundError } from "../services/exceptions/file-not-found.error";
import { FileService, IFileUpload } from "../services/file.service";

export class FileController {
    private fileService: FileService;

    constructor() {
        this.fileService = new FileService();
    }

    async upload(req: AuthRequest, res: Response): Promise<Response> {
        try {
            if (!req.file)
                return res.status(400).json({ error: "File not sent." });

            const { topicId } = req.params as { topicId: string };
            const originalName: string = req.body.name;
            const fileName: string = req.file.filename;

            const file: FileResponseDTO = await this.fileService.upload({
                originalName,
                fileName,
                topicId
            } as IFileUpload);

            return res.status(201).json(file);
        } catch (error) {
            return res.status(500).json({ message: "Error uploading file.", error });
        }
    }

    async update(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params as { id: string };
            const data: FileUpdateDTO = req.body;
            const file: FileResponseDTO = await this.fileService.update(id, data);
            return res.status(200).json(file);
        } catch (error) {
            if (error instanceof FileNotFoundError)
                return res.status(error.statusCode).json({ message: error.message });

            return res.status(500).json({ message: "Error updating file.", error });
        }
    }

    async delete(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params as { id: string };
            await this.fileService.delete(id);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof FileNotFoundError)
                return res.status(error.statusCode).json({ message: error.message });

            return res.status(500).json({ message: "Error deleting file.", error });
        }
    }

    async getFilesByTopic(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { topicId } = req.params as { topicId: string };
            const files: FileResponseDTO[] = await this.fileService.getFilesByTopic(topicId);
            return res.status(200).json(files);
        } catch (error) {
            return res.status(500).json({ message: "Error getting files.", error });
        }
    }
}
