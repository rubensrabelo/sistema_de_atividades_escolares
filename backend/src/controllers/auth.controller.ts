import { Request, Response } from "express";

import { AuthService } from "../services/auth.service.js";
import { RegisterDTO } from "../dtos/auth/register.dto.js";
import { LoginDTO } from "../dtos/auth/login.dto.js";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data: RegisterDTO = req.body;
            const user = await this.authService.register(data);
            return res.status(201).json({ message: "User registered successfully", user });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const data: LoginDTO = req.body;
            const token = await this.authService.login(data);
            return res.status(200).json({ token });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}
