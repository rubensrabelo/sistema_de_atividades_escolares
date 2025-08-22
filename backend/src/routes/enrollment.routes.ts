import { Router } from "express";
import { EnrollmentController } from "../controllers/enrollment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { hasRole } from "../middlewares/role.middleware";

const router = Router();
const enrollmentController = new EnrollmentController();

router.post("/:courseId/enroll", authMiddleware, hasRole("student"), (req, res) => enrollmentController.enroll(req, res));
router.post("/:courseId/unenroll", authMiddleware, hasRole("student"), (req, res) => enrollmentController.unenroll(req, res));

router.get("/my-courses", authMiddleware, hasRole("student"), (req, res) => enrollmentController.getMyCourses(req, res));

export default router;
