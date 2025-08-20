import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password, role } = req.body;
            const user = await authService.register(firstName, lastName, email, password, role);
            res.status(201).json({ message: "User registered successfully", user });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await authService.login(email, password);
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
