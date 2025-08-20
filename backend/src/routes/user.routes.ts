import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { UserUpdateDTO } from "../dtos/user/user-update.dto";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const controller = new UserController();

router.use(authMiddleware);

router.get("/me", (req, res) => controller.getMe(req, res));
router.put("/me", validationMiddleware(UserUpdateDTO), (req, res) => controller.update(req, res));
router.delete("/me", (req, res) => controller.delete(req, res));

export default router;
