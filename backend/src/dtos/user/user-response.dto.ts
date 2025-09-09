import { UserRole } from "../../models/enums/user-role.enum";

export class UserResponseDTO {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public role: UserRole,
    public active: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public password?: string
  ) { }
}
