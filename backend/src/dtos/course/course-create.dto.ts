import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CourseCreateDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;
}