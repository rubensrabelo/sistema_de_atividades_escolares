export const UserRole = {
    TEACHER: "teacher",
    STUDENT: "student",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];