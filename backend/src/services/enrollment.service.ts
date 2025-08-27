import Course from "../models/course.model";
import { ICourseDocument } from "../models/interfaces/course.interface";
import { Types } from "mongoose";
import { CourseResponseDTO } from "../dtos/course/course-response.dto";
import { StudentCoursesResponseDTO } from "../dtos/course/student-courses-response.dto";
import { EnrollmentResponseDTO } from "../dtos/enrollment/enrollment-response.dto";
import { CourseNotFoundError } from "./exceptions/course-not-found.error";

export class EnrollmentService {
  async enrollStudent(courseId: string, studentId: string): Promise<EnrollmentResponseDTO | null> {
    const course: ICourseDocument | null = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: new Types.ObjectId(studentId) } },
      { new: true }
    );

    if (!course)
      throw new CourseNotFoundError();

    const courseDTO: CourseResponseDTO = new CourseResponseDTO(
      course._id.toString(),
      course.title,
      course.active,
      course.createBy,
      course.createdAt!,
      course.updatedAt!,
      course.description
    );

    return new EnrollmentResponseDTO("Enrollment successfully completed!", courseDTO);
  }

  async unenrollStudent(courseId: string, studentId: string): Promise<EnrollmentResponseDTO | null> {
    const course: ICourseDocument | null = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { students: new Types.ObjectId(studentId) } },
      { new: true }
    );

    if (!course) 
      throw new CourseNotFoundError();

    const courseDTO: CourseResponseDTO = new CourseResponseDTO(
      course._id.toString(),
      course.title,
      course.active,
      course.createBy,
      course.createdAt!,
      course.updatedAt!,
      course.description
    );

    return new EnrollmentResponseDTO("Unenrollment successfully completed!", courseDTO);
  }

  async getStudentCourses(studentId: string): Promise<StudentCoursesResponseDTO> {
    const courses: ICourseDocument[] = await Course.find({
      students: new Types.ObjectId(studentId),
      active: true,
    });

    const coursesDTO: CourseResponseDTO[] = courses.map(
      (course) =>
        new CourseResponseDTO(
          course._id.toString(),
          course.title,
          course.active,
          course.createBy,
          course.createdAt!,
          course.updatedAt!,
          course.description
        )
    );

    return new StudentCoursesResponseDTO(studentId, coursesDTO);
  }
}
