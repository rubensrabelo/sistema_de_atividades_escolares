import { Response } from "express";
import { CourseService } from "../services/course.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CourseResponseDTO } from "../dtos/course/course-response.dto";

export class CourseController {
    private courseService: CourseService;

    constructor() {
        this.courseService = new CourseService();
    }

    async create(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId: string = req.user!.id;
            const course: CourseResponseDTO = await this.courseService.create(req.body, userId);
            return res.status(201).json(course);
        } catch (error) {
            return res.status(500).json({ message: "Error creating course.", error });
        }
    }

    async update(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params as { id: string };
            const course: CourseResponseDTO | null = await this.courseService.update(id, req.body);

            if (!course)
                return res.status(404).json({ message: "Course not found." });

            return res.status(200).json(course);
        } catch (error) {
            return res.status(500).json({ message: "Error updating course.", error });
        }
    }

    async delete(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const { id } = req.params as { id: string };
            const course: CourseResponseDTO | null = await this.courseService.delete(id);

            if (!course) {
                return res.status(404).json({ message: "Course not found." });
            }

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Error deleting course.", error });
        }
    }

    async getAll(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const page: number = parseInt(req.query.page as string) || 1;
            const limit: number = parseInt(req.query.limit as string) || 10;

            const { data, total } = await this.courseService.getAll(page, limit);

            return res.json({
                data,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            });
        } catch (error) {
            return res.status(500).json({ message: "Error fetching courses", error });
        }
    }

    async getByCreator(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const teacherId: string | null = req.user!.id;

            const page: number = parseInt(req.query.page as string) || 1;
            const limit: number = parseInt(req.query.limit as string) || 10;

            const { data, total } = await this.courseService.getByCreator(teacherId, page, limit);

            return res.json({
                data,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            });
        } catch (error) {
            return res.status(500).json({ message: "Error fetching courses by creator", error });
        }
    }
}
