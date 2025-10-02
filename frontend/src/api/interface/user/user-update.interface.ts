import type { UserRole } from "../../enums/user-role.enum";

export interface UserUpdate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    active: boolean;
}