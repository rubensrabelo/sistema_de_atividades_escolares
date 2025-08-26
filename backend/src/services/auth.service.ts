import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { ENV } from "../config/env";
import User from "../models/user.model";
import { RegisterDTO } from "../dtos/auth/register.dto";
import { LoginDTO } from "../dtos/auth/login.dto";
import { UserResponseDTO } from "../dtos/user/user-response.dto";
import { TokenResponseDTO } from "../dtos/auth/token-response.dto";
import { IUserDocument } from "../models/interfaces/user.interface";
import { InvalidCredentialsError } from "./exceptions/invalid-credentials.error";
import { UserDeactivatedError } from "./exceptions/user-deactivated.error";
import { EmailAlreadyExistsError } from "./exceptions/email-already-exists.error";

export class AuthService {
    async register(data: RegisterDTO): Promise<UserResponseDTO> {
        const { firstName, lastName, email, password, role }: RegisterDTO = data;

        const existingUser: IUserDocument | null = await User.findOne({ email });
        if (existingUser)
            throw new EmailAlreadyExistsError();

        const hashedPassword: string = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });

        const savedUser: IUserDocument = await user.save();

        return new UserResponseDTO(
            savedUser._id.toString(),
            savedUser.firstName,
            savedUser.lastName,
            savedUser.email,
            savedUser.role,
            savedUser.active,
            savedUser.createdAt!,
            savedUser.updatedAt!
        );
    }

    async login(data: LoginDTO): Promise<TokenResponseDTO> {
        const { email, password }: LoginDTO = data;

        const user: IUserDocument | null = await User.findOne({ email }).select("+password");
        if (!user)
            throw new InvalidCredentialsError();

        if (!user.active)
            throw new UserDeactivatedError();

        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new InvalidCredentialsError();

        const token: string = jwt.sign(
            { id: user._id.toString(), email: user.email, role: user.role },
            ENV.JWT_SECRET,
            { expiresIn: "30m" }
        );

        return new TokenResponseDTO(token);
    }
}
