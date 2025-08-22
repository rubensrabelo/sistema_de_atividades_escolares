import Course, { CourseDocument } from "../models/course.model";
import { Types } from "mongoose";

export class EnrollmentService {
  async enrollStudent(courseId: string, studentId: string): Promise<CourseDocument | null> {
    return await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: new Types.ObjectId(studentId) } },
      { new: true }
    );
  }

  async unenrollStudent(courseId: string, studentId: string): Promise<CourseDocument | null> {
    return await Course.findByIdAndUpdate(
      courseId,
      { $pull: { students: new Types.ObjectId(studentId) } },
      { new: true }
    );
  }

  async getStudentCourses(studentId: string): Promise<CourseDocument[]> {
    return await Course.find({
      students: new Types.ObjectId(studentId),
      active: true
    });
  }
}
