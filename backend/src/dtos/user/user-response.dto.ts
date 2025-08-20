export interface UserResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  role: "student" | "teacher";
  createdAt: Date;
  updatedAt: Date;
}