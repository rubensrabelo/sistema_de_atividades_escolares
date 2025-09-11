import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { FileService } from "../services/file.service";
import { FileCreateDTO } from "../dtos/file/file-create.dto";

export class FileController {
    private fileService: FileService;

    constructor() {
        this.fileService = new FileService();
    }

    async upload(req: AuthRequest, res: Response): Promise<Response> {
        try {
            // Criar um middlware que lide com o upload de arquivo
            if (!req.file)
                return res.status(400).json({ error: "File not sent." });

            const originalName: string = req.body.name;
            const savedName: string = req.file.filename;
            const topicId: string = req.params.topicId;

            const savedFile = await this.fileService.upload({ 
                originalName,
                fileName: savedName,
                topicId
            });

            return res.status(201).json(savedFile);
        } catch (error) {
            return res.status(500).json({ message: "", error })
        }
    }

    async update(req: AuthRequest, res: Response): Promise<Response> {
        try {

        } catch (error) {
            return res.status(500).json({ message: "", error })
        }
    }

    async delete(req: AuthRequest, res: Response): Promise<Response> {
        try {

        } catch (error) {
            return res.status(500).json({ message: "", error })
        }
    }

    async getFilesByTopic(req: AuthRequest, res: Response): Promise<Response> {
        try {

        } catch (error) {
            return res.status(500).json({ message: "", error })
        }
    }
}