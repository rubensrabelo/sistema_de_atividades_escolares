import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService()
    }

    register = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body;
            const result = await this.authService.register(email, password);
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body;
            const result = await this.authService.login(email, password);
            res.json(result)
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    getProfile = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;
            const user = await this.authService.getProfile(userId);
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
}