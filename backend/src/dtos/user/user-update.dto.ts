import { IsOptional, IsEnum, IsString, MinLength } from "class-validator";

export type UserRole = "student" | "teacher";

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password?: string;

  @IsOptional()
  @IsEnum(["student", "teacher"], { message: "Role must be student or teacher" })
  role?: UserRole;
}
