import { CourseResponseDTO } from "./course-response.dto";

export class StudentCoursesResponseDTO {
  studentId: string;
  courses: CourseResponseDTO[];

  constructor(studentId: string, courses: CourseResponseDTO[]) {
    this.studentId = studentId;
    this.courses = courses;
  }
}
