import { CourseResponseDTO } from "../course/course-response.dto";

export class EnrollmentResponseDTO {
  constructor(
    public message: string,
    public course: CourseResponseDTO
  ) { }
}
