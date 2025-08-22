import { Response } from "express";
import { CourseService } from "../services/course.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export class CourseController {
    private courseService = new CourseService();

    async create(req: AuthRequest, res: Response) {
        try {
            const course = await this.courseService.create(req.body);
            return res.status(201).json(course);
        } catch (error) {
            return res.status(500).json({ message: "Error creating course", error });
        }
    }

    async update(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            const course = await this.courseService.update(id, req.body);

            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }

            return res.json(course);
        } catch (error) {
            return res.status(500).json({ message: "Error updating course", error });
        }
    }

    async delete(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            const course = await this.courseService.delete(id);

            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }

            return res.json({ message: "Course deleted (soft) successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting course", error });
        }
    }

    async getAll(req: AuthRequest, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

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
}
