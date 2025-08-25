import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { EnrollmentService } from "../services/enrollment.service";
import { EnrollmentResponseDTO } from "../dtos/enrollment/enrollment-response.dto";
import { StudentCoursesResponseDTO } from "../dtos/course/student-courses-response.dto";

export class EnrollmentController {
  private enrollmentService: EnrollmentService;

  constructor() {
    this.enrollmentService = new EnrollmentService();
  }

  async enroll(req: AuthRequest, res: Response): Promise<Response<EnrollmentResponseDTO>> {
    try {
      const studentId: string = req.user!.id;
      const { courseId } = req.params as { courseId: string };
      const course: EnrollmentResponseDTO | null = await this.enrollmentService.enrollStudent(courseId, studentId);

      if (!course) 
        return res.status(404).json({ message: "Course not found" });
      
      return res.status(200).json(course);
    } catch (error) {
      return res.status(500).json({ message: "Error enrolling", error });
    }
  }

  async unenroll(req: AuthRequest, res: Response): Promise<Response<EnrollmentResponseDTO>> {
    try {
      const studentId: string = req.user!.id;
      const { courseId } = req.params as { courseId: string };

      const course: EnrollmentResponseDTO | null = await this.enrollmentService.unenrollStudent(courseId, studentId);

      if (!course) 
        return res.status(404).json({ message: "Course not found" });
      
      return res.status(200).json(course);
    } catch (error) {
      return res.status(500).json({ message: "Error unenrolling", error });
    }
  }

  async getMyCourses(req: AuthRequest, res: Response): Promise<Response<StudentCoursesResponseDTO>> {
    try {
      const studentId: string = req.user!.id;
      const courses: StudentCoursesResponseDTO = await this.enrollmentService.getStudentCourses(studentId);
      
      return res.status(200).json(courses);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching courses", error });
    }
  }
}
