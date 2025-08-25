import { CourseResponseDTO } from "../course/course-response.dto";

export class EnrollmentResponseDTO {
  message: string;
  course: CourseResponseDTO;

  constructor(message: string, course: CourseResponseDTO) {
    this.message = message;
    this.course = course;
  }
}
