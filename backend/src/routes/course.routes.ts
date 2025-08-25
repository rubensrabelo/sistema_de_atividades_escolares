import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { hasRole } from "../middlewares/role.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CourseCreateDTO } from "../dtos/course/course-create.dto";
import { CourseUpdateDTO } from "../dtos/course/course-update.dto";

const router: Router = Router();
const courseController: CourseController = new CourseController();

router.post("/",
    authMiddleware,
    hasRole("teacher"),
    validationMiddleware(CourseCreateDTO),
    (req, res) => courseController.create(req, res)
);

router.put(
    "/:id",
    authMiddleware,
    hasRole("teacher"),
    validationMiddleware(CourseUpdateDTO),
    (req, res) => courseController.update(req, res)
);

router.delete(
    "/:id",
    authMiddleware,
    hasRole("teacher"),
    (req, res) => courseController.delete(req, res)
);

router.get(
    "/",
    authMiddleware,
    (req, res) => courseController.getAll(req, res)
);

router.get(
  "/my-courses",
  authMiddleware,
  hasRole("teacher"),
  (req, res) => courseController.getByCreator(req, res)
);

export default router;
