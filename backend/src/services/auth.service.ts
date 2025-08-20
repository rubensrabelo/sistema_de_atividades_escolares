import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User, { IUser } from "../models/user.model";
import { ENV } from "../config/env";

export class AuthService {
    async register(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        role: "student" | "teacher"
    ): Promise<IUser> {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });

        return user.save();
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ email });
        if (!user)
            throw new Error("Invalid credentials.")

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            throw new Error("Invalid password.");

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            ENV.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return { token };
    }
}