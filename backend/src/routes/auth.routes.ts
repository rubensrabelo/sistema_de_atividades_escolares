import { Router } from "express";

import { AuthController } from "../controllers/auth.controller.js";
import { RegisterDTO } from "../dtos/auth/register.dto.js";
import { LoginDTO } from "../dtos/auth/login.dto.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";

const router = Router();
const controller = new AuthController();

router.post("/register", validationMiddleware(RegisterDTO), (req, res) => controller.register(req, res));
router.post("/login", validationMiddleware(LoginDTO), (req, res) => controller.login(req, res));

export default router;
