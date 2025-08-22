import { IsOptional, IsString } from "class-validator";

export class CourseUpdateDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}