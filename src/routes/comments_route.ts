import express from "express";
import commentsController from '../controllers/comments_controller';
import { authMiddleware } from "../controllers/auth_controller";

const router = express.Router();

router.get("/", commentsController.getAll.bind(commentsController));

router.get("/:id", commentsController.getById.bind(commentsController));

router.post("/", authMiddleware, commentsController.create.bind(commentsController));

router.put("/:id", authMiddleware, commentsController.updateItem.bind(commentsController));

router.delete("/:id", authMiddleware, commentsController.deleteItem.bind(commentsController));

export default router;
