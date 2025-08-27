import Course from "../models/course.model";
import { ICourseDocument } from "../models/interfaces/course.interface";
import { CourseCreateDTO } from "../dtos/course/course-create.dto";
import { CourseUpdateDTO } from "../dtos/course/course-update.dto";
import { CourseResponseDTO } from "../dtos/course/course-response.dto";
import { CourseNotFoundError } from "./exceptions/course-not-found.error";

export class CourseService {
  async create(data: CourseCreateDTO, userId: string): Promise<CourseResponseDTO> {
    const course: ICourseDocument = new Course({
      ...data,
      createBy: userId
    });
    const courseDTO: ICourseDocument = await course.save();
    return new CourseResponseDTO(
      courseDTO.id,
      courseDTO.title,
      courseDTO.active,
      courseDTO.createBy,
      courseDTO.createdAt!,
      courseDTO.updatedAt!,
    );
  }

  async update(id: string, data: CourseUpdateDTO): Promise<CourseResponseDTO | null> {
    const courseDTO: ICourseDocument | null = await Course.findByIdAndUpdate(id, { $set: data }, { new: true });

    if (!courseDTO)
      throw new CourseNotFoundError();

    return new CourseResponseDTO(
      courseDTO.id,
      courseDTO.title,
      courseDTO.active,
      courseDTO.createBy,
      courseDTO.createdAt!,
      courseDTO.updatedAt!,
    );
  }

  async delete(id: string): Promise<void> {
    const courseDTO: ICourseDocument | null = await Course.findByIdAndUpdate(id, { $set: { active: false } }, { new: true });

    if (!courseDTO)
      throw new CourseNotFoundError();
  }

  async getAll(
    page: number,
    limit: number
  ): Promise<{ data: CourseResponseDTO[]; total: number }> {
    const skip: number = (page - 1) * limit;

    const [courses, total]: [ICourseDocument[], number] = await Promise.all([
      Course.find({ active: true }).skip(skip).limit(limit),
      Course.countDocuments({ active: true }),
    ]);

    const data: CourseResponseDTO[] = courses.map(
      (course: ICourseDocument) =>
        new CourseResponseDTO(
          course._id.toString(),
          course.title,
          course.active,
          course.createBy.toString(),
          course.createdAt!,
          course.updatedAt!,
          course.description ?? undefined,
        )
    );

    return { data, total };
  }

  async getByCreator(
    teacherId: string,
    page: number,
    limit: number
  ): Promise<{ data: CourseResponseDTO[]; total: number }> {
    const skip: number = (page - 1) * limit;

    const [courses, total]: [ICourseDocument[], number] = await Promise.all([
      Course.find({ createBy: teacherId, active: true }).skip(skip).limit(limit),
      Course.countDocuments({ createBy: teacherId, active: true }),
    ]);

    const data: CourseResponseDTO[] = courses.map(
      (course: ICourseDocument) =>
        new CourseResponseDTO(
          course._id.toString(),
          course.title,
          course.active,
          course.createBy.toString(),
          course.createdAt!,
          course.updatedAt!,
          course.description ?? undefined,
        )
    );

    return { data, total };
  }
}
