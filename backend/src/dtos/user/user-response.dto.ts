export interface UserResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "student" | "teacher";
  createdAt: Date;
  updatedAt: Date;
}