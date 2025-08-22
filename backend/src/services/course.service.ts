import Course from "../models/course.model";
import { ICourseDocument } from "../models/interfaces/course.interface";
import { CourseCreateDTO } from "../dtos/course/course-create.dto";
import { CourseUpdateDTO } from "../dtos/course/course-update.dto";

export class CourseService {
  async create(data: CourseCreateDTO): Promise<ICourseDocument> {
    const course = new Course(data);
    return await course.save();
  }

  async update(id: string, data: CourseUpdateDTO): Promise<ICourseDocument | null> {
    return await Course.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async delete(id: string): Promise<ICourseDocument | null> {
    return await Course.findByIdAndUpdate(id, { $set: { active: false } }, { new: true });
  }

  async getAll(page: number, limit: number): Promise<{ data: ICourseDocument[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Course.find({ active: true }).skip(skip).limit(limit),
      Course.countDocuments({ active: true }),
    ]);

    return { data, total };
  }
}
