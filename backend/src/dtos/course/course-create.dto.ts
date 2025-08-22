import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CourseCreateDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;
}