import { Router } from "express";
import multer from "multer";

import { FileController } from "../controllers/file.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { hasRole } from "../middlewares/role.middleware";

const router = Router();
const fileController = new FileController();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = multer({ storage });

router.use(authMiddleware);

router.post(
  "/:topicId/upload",
  hasRole("teacher"),
  upload.single("file"),
  (req, res) => fileController.upload(req, res)
);

router.put(
  "/:id",
  hasRole("teacher"),
  (req, res) => fileController.update(req, res)
);

router.delete(
  "/:id",
  hasRole("teacher"),
  (req, res) => fileController.delete(req, res)
);

router.get(
  "/topic/:topicId",
  (req, res) => fileController.getFilesByTopic(req, res)
);

export default router;