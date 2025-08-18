import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

const JWT_SECRET = "mysecretkey"

export class AuthService {
    async register(email: string, password: string) {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            throw new Error("This email is already in use.");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();
        return { message: "User registered successfully!" }
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ email });
        if (!user)
            throw new Error("User not found.")

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            throw new Error("Invalid password.");

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return { token };
    }

    async getProfile(userId: string) {
        const user = await User.findById(userId).select("-password");
        if (!user)
            throw new Error("User not found.")
        return user;
    }
}