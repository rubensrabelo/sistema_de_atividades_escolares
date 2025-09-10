export class FileNotFoundError extends Error {
  statusCode: number;
  constructor(message: string = "File not found") {
    super(message);
    this.name = "FileNotFoundError";
    this.statusCode = 404;
  }
}