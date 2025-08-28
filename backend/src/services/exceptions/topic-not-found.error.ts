export class TopicNotFoundError extends Error {
  statusCode: number;
  constructor(message: string = "Course not found") {
    super(message);
    this.name = "CourseNotFoundError";
    this.statusCode = 404;
  }
}