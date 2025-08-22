export interface CourseResponseDTO {
  id: string;
  title: string;
  description?: string;
  active: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}