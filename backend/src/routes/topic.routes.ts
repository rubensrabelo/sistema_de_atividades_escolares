import { Router } from "express";
import { TopicController } from "../controllers/topic.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { hasRole } from "../middlewares/role.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { TopicCreateDTO } from "../dtos/topic/topic-create.dto";
import { TopicUpdateDTO } from "../dtos/topic/topic-update.dto";

const topicController = new TopicController();
const router = Router();

router.post(
  "/courses/:courseId",
  authMiddleware,
  hasRole("teacher"),
  validationMiddleware(TopicCreateDTO),
  (req, res) => topicController.create(req, res)
);

router.get(
  "/courses/:courseId",
  authMiddleware,
  (req, res) => topicController.getAllByCourse(req, res)
);

router.put(
  "/:id",
  authMiddleware,
  hasRole("teacher"),
  validationMiddleware(TopicUpdateDTO),
  (req, res) => topicController.update(req, res)
);

router.delete(
  "/:id",
  authMiddleware,
  hasRole("teacher"),
  (req, res) => topicController.delete(req, res)
);

router.get(
  "/:id",
  authMiddleware,
  (req, res) => topicController.getById(req, res)
);

export default router;
