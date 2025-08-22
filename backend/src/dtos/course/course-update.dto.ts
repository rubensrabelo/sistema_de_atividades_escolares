import { IsOptional, IsString } from "class-validator";

export class CourseUpdateDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}