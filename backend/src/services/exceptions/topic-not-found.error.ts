export class TopicNotFoundError extends Error {
  statusCode: number;
  constructor(message: string = "Topic not found") {
    super(message);
    this.name = "TopicNotFoundError";
    this.statusCode = 404;
  }
}