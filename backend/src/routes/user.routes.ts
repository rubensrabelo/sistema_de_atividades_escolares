import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { UserUpdateDTO } from "../dtos/user/user-update.dto";
import { authMiddleware } from "../middlewares/auth.middleware";

const router: Router = Router();
const userController: UserController = new UserController();

router.use(authMiddleware);

router.get("/me", (req, res) => userController.getMe(req, res));
router.put("/me", validationMiddleware(UserUpdateDTO), (req, res) => userController.update(req, res));
router.delete("/me", (req, res) => userController.delete(req, res));

export default router;
