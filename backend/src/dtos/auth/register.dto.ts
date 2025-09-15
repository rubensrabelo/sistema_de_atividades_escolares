import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { UserRole } from "../../models/enums/user-role.enum";

export class RegisterDTO {
  @IsNotEmpty({ message: "First name is required" })
  firstName!: string;

  @IsNotEmpty({ message: "Last name is required" })
  lastName!: string;

  @IsEmail({}, { message: "Invalid email" })
  email!: string;

  @MinLength(6, { message: "Password must be at least 6 characters" })
  password!: string;

  @IsEnum(UserRole, { message: "Role must be student or teacher" })
  role!: UserRole;
}
