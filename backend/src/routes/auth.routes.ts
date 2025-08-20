import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { RegisterDTO } from "../dtos/auth/register.dto";
import { LoginDTO } from "../dtos/auth/login.dto";
import { validationMiddleware } from "../middlewares/validation.middleware";

const router = Router();
const controller = new AuthController();

router.post("/register", validationMiddleware(RegisterDTO), (req, res) => controller.register(req, res));
router.post("/login", validationMiddleware(LoginDTO), (req, res) => controller.login(req, res));

export default router;
