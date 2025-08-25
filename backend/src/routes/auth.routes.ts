import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { RegisterDTO } from "../dtos/auth/register.dto";
import { LoginDTO } from "../dtos/auth/login.dto";
import { validationMiddleware } from "../middlewares/validation.middleware";

const router: Router = Router();
const authController: AuthController = new AuthController();

router.post("/register", validationMiddleware(RegisterDTO), (req, res) => authController.register(req, res));
router.post("/login", validationMiddleware(LoginDTO), (req, res) => authController.login(req, res));

export default router;
