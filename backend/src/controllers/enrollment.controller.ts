import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { EnrollmentService } from "../services/enrollment.service";

export class EnrollmentController {
  private enrollmentService: EnrollmentService;

  constructor() {
    this.enrollmentService = new EnrollmentService();
  }

  async enroll(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user!.id;
      const { courseId } = req.params;
      const course = await this.enrollmentService.enrollStudent(courseId, studentId);

      if (!course) return res.status(404).json({ message: "Course not found" });
      return res.json({ message: "Enrolled successfully", course });
    } catch (error) {
      return res.status(500).json({ message: "Error enrolling", error });
    }
  }

  async unenroll(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user!.id;
      const { courseId } = req.params;
      const course = await this.enrollmentService.unenrollStudent(courseId, studentId);

      if (!course) return res.status(404).json({ message: "Course not found" });
      return res.json({ message: "Unenrolled successfully", course });
    } catch (error) {
      return res.status(500).json({ message: "Error unenrolling", error });
    }
  }

  async getMyCourses(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user!.id;
      const courses = await this.enrollmentService.getStudentCourses(studentId);
      return res.json(courses);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching courses", error });
    }
  }
}
