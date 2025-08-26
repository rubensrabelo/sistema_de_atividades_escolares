import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";
import { RegisterDTO } from "../dtos/auth/register.dto";
import { LoginDTO } from "../dtos/auth/login.dto";
import { TokenResponseDTO } from "../dtos/auth/token-response.dto";
import { UserResponseDTO } from "../dtos/user/user-response.dto";
import { UserDeactivatedError } from "../services/exceptions/user-deactivated.error";
import { InvalidCredentialsError } from "../services/exceptions/invalid-credentials.error";
import { EmailAlreadyExistsError } from "../services/exceptions/email-already-exists.error";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data: RegisterDTO = req.body;
            const userDTO: UserResponseDTO = await this.authService.register(data);
            return res.status(201).json({ message: "User registered successfully", userDTO });
        } catch (error: any) {
            if (error instanceof EmailAlreadyExistsError)
                return res.status(error.statusCode).json({ message: error.message })

            return res.status(400).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const data: LoginDTO = req.body;
            const tokenDTO: TokenResponseDTO = await this.authService.login(data);

            return res.status(200).json({ tokenDTO });
        } catch (error: any) {
            if (error instanceof InvalidCredentialsError)
                return res.status(error.statusCode).json({ message: error.message });

            if (error instanceof UserDeactivatedError)
                return res.status(error.statusCode).json({ message: error.message });

            return res.status(400).json({ error: error.message });
        }
    }
}
