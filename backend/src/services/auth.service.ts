import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { ENV } from "../config/env.js";
import User from "../models/user.model.js";
import { RegisterDTO } from "../dtos/auth/register.dto.js";
import { LoginDTO } from "../dtos/auth/login.dto.js";
import { UserResponseDTO } from "../dtos/user/user-response.dto.js";

export class AuthService {
    async register(data: RegisterDTO): Promise<UserResponseDTO> {
        const { firstName, lastName, email, password, role } = data;

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("Email already registered");

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });

        const savedUser = await user.save();

        return {
            id: savedUser._id.toString(),
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            role: savedUser.role,
            createdAt: savedUser.createdAt!,
            updatedAt: savedUser.updatedAt!,
        };
    }

    async login(data: LoginDTO): Promise<string> {
        const { email, password } = data;

        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = jwt.sign(
            { id: user._id.toString(), email: user.email, role: user.role },
            ENV.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return token;
    }
}
