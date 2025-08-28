import { Response } from "express";

import { TopicResponseDTO } from "../dtos/topic/topic-response.dto";
import { AuthRequest } from "../middlewares/auth.middleware";
import { TopicNotFoundError } from "../services/exceptions/topic-not-found.error";
import { TopicService } from "../services/topic.service";

export class TopicController {
    private topicService: TopicService;

    constructor() {
        this.topicService = new TopicService();
    }

    async create(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { courseId } = req.params as { courseId: string };
            const topic: TopicResponseDTO = await this.topicService.create(req.body, courseId);
            return res.status(201).json(topic);
        } catch (error) {
            return res.status(500).json({ message: "Error creating topic.", error });
        }
    }

    async update(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params as { id: string };
            const topic: TopicResponseDTO | null = await this.topicService.update(id, req.body);
            return res.status(200).json(topic);
        } catch (error) {
            if (error instanceof TopicNotFoundError)
                return res.status(error.statusCode).json({ message: error.message });

            return res.status(500).json({ message: "Error updating topic.", error });
        }
    }

    async delete(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params as { id: string };
            await this.topicService.delete(id);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof TopicNotFoundError)
                return res.status(error.statusCode).json({ message: error.message });

            return res.status(500).json({ message: "Error deleting topic.", error });
        }
    }

    async getById(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params as { id: string };
            const topic: TopicResponseDTO | null = await this.topicService.getById(id);
            return res.status(200).json(topic);
        } catch (error) {
            if (error instanceof TopicNotFoundError)
                return res.status(error.statusCode).json({ message: error.message });

            return res.status(500).json({ message: "Error get topic.", error });
        }
    }

    async getAllByCourse(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { courseId } = req.params as { courseId: string };
            const topics: TopicResponseDTO[] = await this.topicService.getAllByCourse(courseId);
            return res.status(200).json(topics);
        } catch (error) {
            return res.status(500).json({ message: "Error get topics.", error });
        }
    }
}