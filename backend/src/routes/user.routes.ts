import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { UserUpdateDTO } from "../dtos/user/user-update.dto";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const controller = new UserController();

router.use(authMiddleware);

router.get("/me", authMiddleware, (req, res) => controller.getMe(req, res));
router.put("/:id", validationMiddleware(UserUpdateDTO), (req, res) => controller.updateUser(req, res));
router.delete("/:id", (req, res) => controller.deleteUser(req, res));

export default router;
